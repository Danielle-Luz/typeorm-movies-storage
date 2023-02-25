import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { RepeatedMovieName } from "../errors";
import {
  checkIfNameIsUniqueService,
  checkIfIdExistsService,
} from "../services";

const validateBodyMiddleware =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction) => {
    const { body: payload } = request;

    const validatedBody = schema.parse(payload);

    request.body = validatedBody;

    return next();
  };

const validateQueryParamsMiddleware =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction) => {
    const { query } = request;

    request.validParams = schema.parse(query);

    request.validParams.order =
      request.validParams.sort === "id" ? "ASC" : request.validParams.order;

    return next();
  };

const checkIfNameIsUniqueMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const movieName = request.body.name;

  if (movieName) {
    const nameIsNotUnique = await checkIfNameIsUniqueService(movieName);

    if (nameIsNotUnique) {
      throw new RepeatedMovieName(409, "Movie already exists.");
    }
  }

  return next();
};

const checkIfIdExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const validatedId = parseInt(request.params.id);

  const idExists = await checkIfIdExistsService(validatedId);

  if (!idExists) {
    return response.status(404).send({ message: "Movie not found" });
  }

  return next();
};

export {
  validateBodyMiddleware,
  validateQueryParamsMiddleware,
  checkIfNameIsUniqueMiddleware,
  checkIfIdExistsMiddleware,
};

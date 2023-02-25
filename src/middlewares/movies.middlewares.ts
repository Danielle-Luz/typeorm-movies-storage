import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { RepeatedMovieName } from "../errors";
import { checkIfNameIsUniqueService } from "../services";

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
console.log("aaaaaaa");
    request.validParams = schema.parse(query);

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

export {
  validateBodyMiddleware,
  validateQueryParamsMiddleware,
  checkIfNameIsUniqueMiddleware,
};

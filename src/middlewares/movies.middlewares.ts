import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

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

    return next();
  };

const checkUniqueName = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  
};

export { validateBodyMiddleware, validateQueryParamsMiddleware };

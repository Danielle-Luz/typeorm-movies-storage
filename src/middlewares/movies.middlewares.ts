import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const validateBodyMiddleware =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const { body: payload } = req;

    const validatedBody = schema.parse(payload);

    req.body = validatedBody;

    return next();
  };

export { validateBodyMiddleware };

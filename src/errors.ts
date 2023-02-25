import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import "express-async-errors";

class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
  }
}

class RepeatedMovieName extends AppError {
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
  }
}

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const message = { message: error.message };
  let statusCode = 500;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
  } else if (error instanceof ZodError) {
    statusCode = 400;
  }

  return error ? response.status(statusCode).send(message) : next();
};

export { AppError, RepeatedMovieName, errorHandler };

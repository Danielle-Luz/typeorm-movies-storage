import { Router } from "express";
import { createMovieController, getAllMoviesController } from "../controllers";
import {
  checkIfNameIsUniqueMiddleware,
  validateBodyMiddleware,
  validateQueryParamsMiddleware,
} from "../middlewares";
import { movieCreateSchema } from "../schemas";

const moviesRouter = Router();

moviesRouter.get("", validateQueryParamsMiddleware, getAllMoviesController);

moviesRouter.post(
  "",
  validateBodyMiddleware(movieCreateSchema),
  checkIfNameIsUniqueMiddleware,
  createMovieController
);

export { moviesRouter };

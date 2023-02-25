import { Router } from "express";
import { createMovieController, getAllMoviesController } from "../controllers";
import {
  checkIfNameIsUniqueMiddleware,
  validateBodyMiddleware,
  validateQueryParamsMiddleware,
} from "../middlewares";
import { movieCreateSchema, paginationSchema } from "../schemas";

const moviesRouter = Router();

moviesRouter.get(
  "",
  validateQueryParamsMiddleware(paginationSchema),
  getAllMoviesController
);

moviesRouter.post(
  "",
  validateBodyMiddleware(movieCreateSchema),
  checkIfNameIsUniqueMiddleware,
  createMovieController
);

export { moviesRouter };

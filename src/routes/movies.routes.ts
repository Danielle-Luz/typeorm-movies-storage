import { Router } from "express";
import {
  createMovieController,
  deleteMovieController,
  getAllMoviesController,
  updateMovieController,
} from "../controllers";
import {
  checkIfIdExistsMiddleware,
  checkIfNameIsUniqueMiddleware,
  validateBodyMiddleware,
  validateQueryParamsMiddleware,
} from "../middlewares";
import {
  movieCreateSchema,
  movieUpdateSchema,
  paginationSchema,
} from "../schemas";

const moviesRouter = Router();

moviesRouter.post(
  "",
  validateBodyMiddleware(movieCreateSchema),
  checkIfNameIsUniqueMiddleware,
  createMovieController
);

moviesRouter.patch(
  "/:id",
  checkIfIdExistsMiddleware,
  validateBodyMiddleware(movieUpdateSchema),
  checkIfNameIsUniqueMiddleware,
  updateMovieController
);

moviesRouter.get(
  "",
  validateQueryParamsMiddleware(paginationSchema),
  getAllMoviesController
);

moviesRouter.delete("/:id", checkIfIdExistsMiddleware, deleteMovieController);

export { moviesRouter };

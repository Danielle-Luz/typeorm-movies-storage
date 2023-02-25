import { Request, Response } from "express";
import { iPagination } from "../interfaces";
import {
  createMovieService,
  deleteMovieService,
  getAllMoviesService,
  updateMovieService,
} from "../services";

const createMovieController = async (request: Request, response: Response) => {
  const { body: newMovieData } = request;

  const createdMovie = await createMovieService(newMovieData);

  return response.status(201).send(createdMovie);
};

const getAllMoviesController = async (request: Request, response: Response) => {
  const paginationParams: iPagination = {
    perPage: request.validParams.perPage,
    page: request.validParams.page,
    order: request.validParams.order,
    sort: request.validParams.sort,
  };
  const allFoundMovies = await getAllMoviesService(paginationParams);

  return response.status(200).send(allFoundMovies);
};

const updateMovieController = async (request: Request, response: Response) => {
  const { body: updatedData } = request;
  const id = parseInt(request.params.id);

  const movieAfterUpdate = await updateMovieService(updatedData, id);

  return response.status(200).send(movieAfterUpdate);
};

const deleteMovieController = async (request: Request, response: Response) => {
  const id = parseInt(request.params.id);

  await deleteMovieService(id);

  return response.status(204).send();
};

export {
  createMovieController,
  getAllMoviesController,
  updateMovieController,
  deleteMovieController,
};

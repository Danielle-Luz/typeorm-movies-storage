import { Request, Response } from "express";
import { iPagination } from "../interfaces";
import { createMovieService, getAllMoviesService } from "../services";

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
    sort: request.validParams.sort
  };

  const allFoundMovies = await getAllMoviesService(paginationParams);

  return response.status(200).send(allFoundMovies);
};

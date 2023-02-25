import { Request, Response } from "express";
import { iPagination } from "../interfaces/movies.interface";
import { createMovieService, getAllMoviesService } from "../services";

const createMovieController = async (request: Request, response: Response) => {
  const { body: newMovieData } = request;

  const createdMovie = await createMovieService(newMovieData);

  return response.status(201).send(createdMovie);
};

const getAllMoviesController = async (request: Request, response: Response) => {
  const paginationParams: iPagination = {
    perPage: request.query.perPage,
    page: request.query.page,
    order: request.query.order,
    sort: request.query.sort,
  };

  const allFoundMovies = await getAllMoviesService(paginationParams);

  return response.status(200).send(allFoundMovies);
};

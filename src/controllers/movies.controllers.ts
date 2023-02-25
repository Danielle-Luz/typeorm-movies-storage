import { Request, Response } from "express";
import { createMovieService } from "../services";

const createMovieController = async (request: Request, response: Response) => {
  const { body: newMovieData } = request;

  const createdMovie = await createMovieService(newMovieData);

  return response.status(201).send(createdMovie);
};

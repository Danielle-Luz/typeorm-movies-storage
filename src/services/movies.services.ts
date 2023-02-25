import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { iMovieCreate, iMovieRepo } from "../interfaces";

export const createMovieService = async (newMovie: iMovieCreate) => {
  const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);

  const createdMovie = movieRepository.create(newMovie);

  await movieRepository.save(createdMovie);

  return createdMovie;
};

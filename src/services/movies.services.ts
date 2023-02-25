import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { iMovieCreate, iMovieRepo } from "../interfaces";
import { iPagination } from "../interfaces/movies.interface";

export const createMovieService = async (newMovie: iMovieCreate) => {
  const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);

  const createdMovie = movieRepository.create(newMovie);

  await movieRepository.save(createdMovie);

  return createdMovie;
};

export const getAllMovies = async ({ perPage, page, order }: iPagination) => {
  const movieRepository = AppDataSource.getRepository(Movie);

  perPage = perPage || 5;
  page = page || 1;
  order = order || "ASC";

  const allFoundMovies = await movieRepository.find({
    take: perPage,
    skip: perPage * page - 1,
    order: {
      id: order
    }
  });

  return allFoundMovies;
};

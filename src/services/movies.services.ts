import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { iMovieCreate, iMovieRepo } from "../interfaces";
import { iPagination } from "../interfaces";

const createMovieService = async (newMovieData: iMovieCreate) => {
  const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);

  const createdMovie = movieRepository.create(newMovieData);

  await movieRepository.save(createdMovie);

  return createdMovie;
};

const getAllMoviesService = async ({
  perPage,
  page,
  order,
  sort,
}: iPagination) => {
  const movieRepository = AppDataSource.getRepository(Movie);

  const allFoundMovies = await movieRepository.find({
    take: perPage,
    skip: perPage * page - 1,
    order: {
      [sort]: order,
    },
  });

  return allFoundMovies;
};

export { createMovieService, getAllMoviesService };

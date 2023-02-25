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

  const offset = perPage * page - 1;

  const allFoundMovies = await movieRepository.find({
    take: perPage,
    skip: offset,
    order: {
      [sort]: order,
    },
  });

  const moviesCount = await movieRepository.count();

  return {
    prevPage:
      page !== 1
        ? `http://localhost:3000/movies?page=${page}&perPage=${perPage}`
        : null,
    nextPage:
      offset < moviesCount
        ? `http://localhost:3000/movies?page=${page}&perPage=${perPage}`
        : null,
    count: moviesCount,
    data: allFoundMovies,
  };
};

const checkIfNameIsUniqueService = async (validatedName: string) => {
  const movieRepository = AppDataSource.getRepository(Movie);

  const nameIsNotUnique = await movieRepository.exist({
    where: {
      name: validatedName,
    },
  });

  return nameIsNotUnique;
};

export { createMovieService, getAllMoviesService, checkIfNameIsUniqueService };

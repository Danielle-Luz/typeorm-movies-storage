import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { iMovieCreate, iMovieRepo, iMovieUpdate } from "../interfaces";
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
  const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);

  const offset = perPage * (page - 1);

  const allFoundMovies = await movieRepository.find({
    take: perPage,
    skip: offset,
    order: {
      [sort]: order,
    },
  });

  const moviesCount = await movieRepository.count();

  const maxPages = moviesCount / perPage;

  return {
    prevPage:
      page - 1 !== 0
        ? `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}`
        : null,
    nextPage:
      page <= maxPages
        ? `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`
        : null,
    count: moviesCount,
    data: allFoundMovies,
  };
};

const updateMovieService = async (updatedData: iMovieUpdate, id: number) => {
  const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);

  const updatedDataWithId = { id, ...updatedData };

  const movieAfterUpdate = await movieRepository.save(updatedDataWithId);

  return updatedDataWithId;
};

const deleteMovieService = async (id: number) => {
  const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);

  const removedMovie = await movieRepository.find({ where: { id } });

  await movieRepository.remove(removedMovie);
};

const checkIfNameIsUniqueService = async (validatedName: string) => {
  const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);

  const nameIsNotUnique = await movieRepository.exist({
    where: {
      name: validatedName,
    },
  });

  return nameIsNotUnique;
};

const checkIfIdExistsService = async (validatedId: number) => {
  const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);

  const idExists = movieRepository.exist({ where: { id: validatedId } });

  return idExists;
};

export {
  createMovieService,
  getAllMoviesService,
  updateMovieService,
  deleteMovieService,
  checkIfNameIsUniqueService,
  checkIfIdExistsService,
};

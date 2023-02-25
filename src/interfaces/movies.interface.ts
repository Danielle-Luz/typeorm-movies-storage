import { DeepPartial, Repository } from "typeorm";
import { z } from "zod";
import { Movie } from "../entities";
import { movieCreateSchema } from "../schemas/movie.schemas";

type iMovieCreate = z.infer<typeof movieCreateSchema>;
type iMovieUpdate = DeepPartial<Movie>;
type iMovieRepo = Repository<Movie>;

interface iPagination {
  perPage?: number;
  page?: number;
  order?: "ASC" | "DESC"
}

export { iMovieCreate, iMovieUpdate, iMovieRepo, iPagination };

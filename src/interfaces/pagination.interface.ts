import { z } from "zod";
import { paginationSchema } from "../schemas";

type iPagination = z.infer<typeof paginationSchema>;

export { iPagination };

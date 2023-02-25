import { z } from "zod";

const paginationSchema = z.object({
  perPage: z.number().int().positive().optional().default(5),
  page: z.number().int().positive().optional().default(1),
  sort: z
    .enum(["price", "duration"])
    .optional()
    .transform((value) =>
      value === undefined || value === null ? "id" : value
    ),
  order: z
    .enum(["ASC", "DESC", "asc", "desc"])
    .transform((value) => value.toUpperCase())
    .optional()
    .default("ASC"),
});

export { paginationSchema };

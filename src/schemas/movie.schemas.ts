import { z } from "zod";

const movieCreateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  duration: z.number().int(),
  price: z.number(),
});

const movieUpdateSchema = movieCreateSchema.partial();

export { movieCreateSchema, movieUpdateSchema };

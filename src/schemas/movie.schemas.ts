import { z } from "zod";

const movieCreateSchema = z.object({
  name: z.string().max(50),
  description: z.string().optional(),
  duration: z.number().int().positive(),
  price: z.number().int(),
});

const movieUpdateSchema = movieCreateSchema.partial();

export { movieCreateSchema, movieUpdateSchema };

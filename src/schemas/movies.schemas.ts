import { z } from "zod";

const moviesSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string(),
  duration: z.number().int(),
  price: z.number().int(),
});

export { moviesSchema };

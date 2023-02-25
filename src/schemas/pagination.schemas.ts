import { z } from "zod";

const setDefaultValue = (defaultValue: number) => (value: string) => {
  const valueAsNumber = Number(value);

  if (isNaN(valueAsNumber) || valueAsNumber < 0 || valueAsNumber % 1 !== 0) {
    return defaultValue;
  }

  return valueAsNumber;
};

const paginationSchema = z.object({
  perPage: z.string().transform(setDefaultValue(5)),
  page: z.string().transform(setDefaultValue(1)),
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

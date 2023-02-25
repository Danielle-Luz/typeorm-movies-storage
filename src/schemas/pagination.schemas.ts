import { z } from "zod";

const setDefaultNumberValue =
  (defaultValue: number) => (value: string | undefined) => {
    const valueAsNumber = Number(value);

    if (
      isNaN(valueAsNumber) ||
      valueAsNumber < 1 ||
      valueAsNumber % 1 !== 0 ||
      (defaultValue === 5 && valueAsNumber > 5)
    ) {
      return defaultValue;
    }

    return valueAsNumber;
  };

const setDefaultStringValue =
  (validValues: string[], defaultValue: string) =>
  (value: string | undefined) => {
    const isInvalidValue = !validValues.includes(String(value));

    if (!value || isInvalidValue) {
      return defaultValue;
    }

    return value;
  };

const paginationSchema = z.object({
  perPage: z.string().optional().transform(setDefaultNumberValue(5)),
  page: z.string().optional().transform(setDefaultNumberValue(1)),
  sort: z
    .string()
    .optional()
    .transform(setDefaultStringValue(["price", "duration"], "id")),
  order: z
    .string()
    .optional()
    .transform(setDefaultStringValue(["ASC", "DESC", "asc", "desc"], "ASC"))
    .transform((value) => value.toUpperCase()),
});

export { paginationSchema };

import path from "path";
import { DataSourceOptions } from "typeorm";

export const dataSourceConfig = ((): DataSourceOptions => {
  const entitiesPath = path.join(__dirname, "./entities/**.{js,ts}");
  const migrationsPath = path.join(__dirname, "./migrations/**.{js,ts}");

  if (process.env.NODE_ENV === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [entitiesPath],
    };
  }

  if (!process.env.DATABASE_URL)
    throw new Error("Insert a value in the DATABASE_URL enviroment variable");

  return {
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationsPath],
  };
})();

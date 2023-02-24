import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";

const dataSourceConfig = ((): DataSourceOptions => {
  const entitiesPath = path.join(__dirname, "./entities/**.{js,ts}");
  const migrationsPath = path.join(__dirname, "./migrations/**.{js,ts}");

  const nodeEnviroment: string | undefined = process.env.NODE_ENV;
  const databaseUrl: string | undefined = process.env.DATABASE_URL;

  if (nodeEnviroment === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [entitiesPath],
    };
  }

  if (!databaseUrl)
    throw new Error("Insert a value in the DATABASE_URL enviroment variable");

  return {
    type: "postgres",
    url: databaseUrl,
    synchronize: false,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationsPath],
  };
})();

const appDataSource = new DataSource(dataSourceConfig);

export { appDataSource };

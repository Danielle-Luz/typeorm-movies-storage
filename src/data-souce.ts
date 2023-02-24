import path from "path"

export const dataSourceConfig = () => {
  const entitiesPath = path.join(__dirname, "./entities/**.{js,ts}");
  const migrationsPath = path.join(__dirname, "./migrations/**.{js,ts}");

  
}   
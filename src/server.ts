import { api } from "./app";
import { appDataSource } from "./data-source";

appDataSource
  .initialize()
  .then(async () => {
    console.log("Database was connected");

    await api.listen(3000, () => {
      console.log("API is listening D:");
    });
  })
  .catch((error) => console.error(error));

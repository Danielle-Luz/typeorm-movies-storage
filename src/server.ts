import { app } from "./app";
import { appDataSource } from "./data-source";

appDataSource
  .initialize()
  .then(async () => {
    console.log("Database was connected");

    await app.listen(3000, () => {
      console.log("app is listening D:");
    });
  })
  .catch((error) => console.error(error));

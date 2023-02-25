import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    console.log("Database was connected");

    app.listen(3000, () => {
      console.log("api is listening D:");
    });
  })
  .catch((error) => console.error(error));

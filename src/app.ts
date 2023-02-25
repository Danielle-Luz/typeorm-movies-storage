import { Application } from "express";
import { errorHandler } from "./errors";
import { moviesRouter } from "./routes/movies.routes";

const express = require("express");
const app: Application = express();

app.use(express.json());

app.use("/movies", moviesRouter);

app.use(errorHandler);

export default app;

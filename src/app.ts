import { Application } from "express";
import { moviesRouter } from "./routes/movies.routes";

const express = require("express");
const app: Application = express();

app.use(express.json());

app.use(moviesRouter);

export default app;

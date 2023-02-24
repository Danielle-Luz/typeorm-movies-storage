import { Application } from "express";

const express = require("express");
const app: Application = express();

app.use(express.json());

export default app;

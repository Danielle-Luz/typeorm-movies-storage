const express = require("express");
const api = express();

api.use(express.json());

export { api };

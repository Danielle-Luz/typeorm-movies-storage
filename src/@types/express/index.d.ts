import { Request } from "express";
import { iPagination } from "../../interfaces";

declare global {
  namespace Express {
    interface Request {
      validParams: iPagination;
    }
  }
}

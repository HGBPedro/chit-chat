import { Request, Response } from "express";
import logger from "../config/pino-pretty";

function errorHandler(err: Error, req: Request, res: Response, next: Function) {
  if (err.message) logger.error(err.message)

  const error: typeof err = {
    name: err.name,
    message: err.message,
  }
  
  res.status(400).json({ error })
}

export { errorHandler }

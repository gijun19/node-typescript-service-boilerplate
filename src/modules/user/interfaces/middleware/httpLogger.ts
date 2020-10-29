import { NextFunction, Request, RequestHandler, Response } from "express";

export const httpLogger: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { logger } = req.container.cradle;
  logger.info({
    method: req.method,
    url: req.url,
    message: "http:",
  });
  next();
};

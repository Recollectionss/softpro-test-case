import { HttpError } from '../error/http-error';
import { NextFunction } from 'express';
import { Request, Response } from 'express';

export const errorMiddleware = (
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  res.status(err.statusCode ? err.statusCode : 500).json({
    error: {
      message: err.message,
      ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
    },
  });
};

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateBodyMiddleware<T>(DtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(DtoClass, req.body) as object;
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const formattedErrors = errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      }));

      return res.status(400).json({
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }

    req.body = dtoInstance;
    next();
  };
}

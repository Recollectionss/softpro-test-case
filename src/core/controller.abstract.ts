import { RequestHandler, Router } from 'express';
import { validateBodyMiddleware } from '../middlewares/validate-body.middleware';

export abstract class Controller {
  protected router: Router;
  protected constructor() {
    this.router = Router();
    this.initRoutes();
  }

  abstract initRoutes(): void;

  public getRouter() {
    return this.router;
  }

  protected validate<T>(
    dto: new () => T,
    handler: RequestHandler,
  ): RequestHandler[] {
    return [validateBodyMiddleware(dto), handler.bind(this)];
  }
}

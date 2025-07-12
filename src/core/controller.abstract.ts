import { Router } from 'express';

export abstract class Controller {
  protected router: Router;
  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  abstract initRoutes(): Promise<void>;

  public getRouter() {
    return this.router;
  }
}

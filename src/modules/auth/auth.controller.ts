import { Controller } from '../../core/controller.abstract';

export class AuthController extends Controller {
  async initRoutes(): Promise<void> {
    this.router.post('/sign-in', this.signIn.bind(this));
    this.router.post('/sign-up', this.signUp.bind(this));
    this.router.post('/logout', this.logout.bind(this));
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signIn(request: Request, response: Response) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signUp(request: Request, response: Response) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async logout(request: Request, response: Response) {}
}

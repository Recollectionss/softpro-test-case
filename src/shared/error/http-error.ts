import { HttpCode } from '../enum/http-code.enum';

export class HttpError extends Error {
  public readonly statusCode: HttpCode;

  constructor(
    statusCode?: number | HttpCode.INTERNAL_SERVER_ERROR,
    message?: string | 'Internal Server Error',
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}

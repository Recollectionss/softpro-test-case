export class HttpError extends Error {
  public readonly statusCode: number;

  constructor(
    statusCode: number | 500,
    message: string | 'Internal Server Error',
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}

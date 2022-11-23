export class BaseHttpResponse<T> {
  constructor(
    public readonly data: T,
    public readonly error: string | null = null,
    public readonly statusCode: number
  ) {}

  static success<TData>(data: TData, statusCode = 200) {
    return new BaseHttpResponse(data, null, statusCode)
  }

  static failed(msg: string, statusCode = 400) {
    return new BaseHttpResponse(null, msg, statusCode)
  }
}

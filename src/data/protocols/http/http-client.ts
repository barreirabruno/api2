export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbiden = 403,
  notFound = 404,
  serverError = 500
}

export interface HttpClientRequest {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
}

export interface HttpClientResponse {
  statusCode: HttpStatusCode
  body?: any
}

export interface HttpClient {
  request: (data: HttpClientRequest) => Promise<HttpClientResponse>
}

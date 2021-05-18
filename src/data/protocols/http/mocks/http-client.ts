import { HttpClient, HttpClientRequest, HttpClientResponse, HttpStatusCode } from '../http-client'

export class HttpClientSpy implements HttpClient {
  url?: string
  method?: string
  body?: any
  headers?: any
  response: HttpClientResponse = {
    statusCode: HttpStatusCode.ok
  }

  async request (data: HttpClientRequest): Promise<HttpClientResponse> {
    this.url = data.url
    this.method = data.method
    this.body = data.body
    this.headers = data.headers
    return this.response
  }
}

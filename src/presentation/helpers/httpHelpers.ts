import { HttpResponse } from '../protocols/http'

export const success = (body: any): HttpResponse => {
  return {
    statusCode: 200,
    body: body
  }
}

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

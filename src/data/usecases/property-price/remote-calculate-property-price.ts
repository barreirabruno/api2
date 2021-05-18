/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable space-before-function-paren */
import { PropertyPriceModel } from '../../../domain/models/property-price'
import { PropertyPrice } from '../../../domain/usecases/calculate-property-price'
import { UnexpectedError } from '../../../presentation/errors/unexpected-error'
import { HttpClient, HttpStatusCode } from '../../protocols/http/http-client'

export class RemoteCalculatePropertyPrice implements PropertyPrice {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) { }

  async calculate (): Promise<PropertyPriceModel> {
    const httpClientResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })
    switch (httpClientResponse.statusCode) {
      case HttpStatusCode.ok: return httpClientResponse.body
      case HttpStatusCode.serverError: throw new UnexpectedError()
    }
  }
}

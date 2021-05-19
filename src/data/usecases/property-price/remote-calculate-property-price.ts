/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable space-before-function-paren */
import { PropertyPriceModel, calculatePropertyPrice } from '../../../domain/models/property-price'
import { PropertyPrice } from '../../../domain/usecases/calculate-property-price'
import { UnexpectedError } from '../../../presentation/errors/unexpected-error'
import { HttpClient, HttpStatusCode } from '../../protocols/http/http-client'

export class RemoteCalculatePropertyPrice implements PropertyPrice {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) { }

  async calculate (landSize: number): Promise<PropertyPriceModel> {
    const httpClientResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })

    switch (httpClientResponse.statusCode) {
      case HttpStatusCode.ok: {
        const propertyPrice = calculatePropertyPrice(landSize, Number(httpClientResponse.body.price))
        return {
          landSize,
          squareMeterPrice: httpClientResponse.body.price,
          propertyPrice
        }
      }
      case HttpStatusCode.serverError: throw new UnexpectedError()
    }
  }
}

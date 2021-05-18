/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable space-before-function-paren */
import { mockPropertyPrice } from '../../../domain/models/mocks/property-price'
import { PropertyPriceModel } from '../../../domain/models/property-price'
import { PropertyPrice } from '../../../domain/usecases/calculate-property-price'
import { HttpClient } from '../../protocols/http/http-client'

export class CalculatePropertyPrice implements PropertyPrice {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) { }

  async calculate (): Promise<PropertyPriceModel> {
    await this.httpClient.request({
      url: this.url,
      method: 'get'
    })

    return mockPropertyPrice(200)
  }
}

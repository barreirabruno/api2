import { PropertyPriceModel } from '../../../domain/models/property-price'
import { PropertyPrice } from '../../../domain/usecases/calculate-property-price'
import { mockPropertyPrice } from '../../../domain/models/mocks/property-price'
import { HttpClient, HttpClientRequest, HttpClientResponse, HttpStatusCode } from '../../protocols/http/http-client'

class HttpClientSpy implements HttpClient {
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

class CalculatePropertyPrice implements PropertyPrice {
  constructor (
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

describe('Calculate property price', () => {
  test('Should call HttpClient to get meter price', async () => {
    const url = 'https://any_url'
    const httpClientSpy = new HttpClientSpy()
    const propertyPrice = new CalculatePropertyPrice(url, httpClientSpy)
    await propertyPrice.calculate()

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
  })
  test('Should return a property price on success', async () => {
    const url = 'https://any_url'
    const httpClientSpy = new HttpClientSpy()
    const propertyPrice = new CalculatePropertyPrice(url, httpClientSpy)
    const sut = await propertyPrice.calculate()
    expect(sut).toEqual(mockPropertyPrice(200))
  })
})

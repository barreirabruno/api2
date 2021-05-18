import { RemoteCalculatePropertyPrice } from './remote-calculate-property-price'
import { HttpClientSpy } from '../../protocols/http/mocks/http-client'
import { HttpStatusCode } from '../../protocols/http/http-client'
import { UnexpectedError } from '../../../presentation/errors/unexpected-error'
import { mockMeterPrice } from '../../../domain/models/mocks/meter-price'

interface SutTypes {
  httpClientSpy: HttpClientSpy
  sut: RemoteCalculatePropertyPrice
}

const makeSut = (url: string = 'https://any_url'): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteCalculatePropertyPrice(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('Calculate property price', () => {
  test('Should call HttpClient to get meter price', async () => {
    const { sut, httpClientSpy } = makeSut()
    await sut.calculate()

    expect(httpClientSpy.url).toBe('https://any_url')
    expect(httpClientSpy.method).toBe('get')
  })
  test('Should throw ServerError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.calculate()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should return a property price on success', async () => {
    const httpResult = mockMeterPrice()
    const { sut, httpClientSpy } = makeSut('https://any_url')
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const remoteCalculatePropertyPriceResponse = await sut.calculate()
    expect(remoteCalculatePropertyPriceResponse).toEqual(httpResult)
  })
})

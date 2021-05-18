import { RemoteCalculatePropertyPrice } from './remote-calculate-property-price'
import { mockPropertyPrice } from '../../../domain/models/mocks/property-price'
import { HttpClientSpy } from '../../protocols/http/mocks/http-client'

interface SutTypes {
  httpClientSpy: HttpClientSpy
  sut: RemoteCalculatePropertyPrice
}

const makeSut = (url: string): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteCalculatePropertyPrice(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('Calculate property price', () => {
  test('Should call HttpClient to get meter price', async () => {
    const fakeUrl = 'https://any_url'
    const { sut, httpClientSpy } = makeSut(fakeUrl)
    await sut.calculate()

    expect(httpClientSpy.url).toBe(fakeUrl)
    expect(httpClientSpy.method).toBe('get')
  })
  test('Should return a property price on success', async () => {
    const fakeUrl = 'https://any_url'
    const { sut } = makeSut(fakeUrl)
    const remoteCalculatePropertyPriceResponse = await sut.calculate()
    expect(remoteCalculatePropertyPriceResponse).toEqual(mockPropertyPrice(200))
  })
})

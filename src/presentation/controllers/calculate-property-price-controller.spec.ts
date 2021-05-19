import { CalculatePropertyPriceController } from './calculate-property-price-controller'
import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest } from '../protocols/http'
import { PropertyPrice } from '../../domain/usecases/calculate-property-price'
import { PropertyPriceModel } from '../../domain/models/property-price'
import { mockMeterPrice } from '../../domain/models/mocks/meter-price'
import { OutOfRangeParamError } from '../errors/out-of-rang-param-error'

const makeRequest = (landSizeValue: any): HttpRequest => {
  return {
    body: {
      landSize: landSizeValue
    }
  }
}

const makePropertyPrice = (): PropertyPrice => {
  class PropertyPriceStub implements PropertyPrice {
    async calculate (landSize: number): Promise<PropertyPriceModel> {
      const mockMeterPriceFromApi1 = mockMeterPrice()
      const propertyPrice = landSize * Number(mockMeterPriceFromApi1.price)
      return await new Promise((resolve, reject) => resolve({
        landSize: landSize,
        squareMeterPrice: mockMeterPriceFromApi1.price,
        propertyPrice: propertyPrice
      }))
    }
  }

  return new PropertyPriceStub()
}

interface SutTypes {
  propertyPriceStub: PropertyPrice
  sut: CalculatePropertyPriceController
}

const makeSut = (): SutTypes => {
  const propertyPriceStub = makePropertyPrice()
  const sut = new CalculatePropertyPriceController(propertyPriceStub)
  return {
    propertyPriceStub,
    sut
  }
}

describe('Calculate meter price controller', () => {
  test('Should return 400 if land size is invalid', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(5))
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new OutOfRangeParamError('landSize'))
  })
  test('Should return 400 if no land size is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(null))
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new MissingParamError('landSize'))
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(96))
    expect(httpResponse.statusCode).toEqual(200)
    expect(httpResponse.body).toEqual({
      landSize: 96,
      squareMeterPrice: '3645.83',
      propertyPrice: expect.any(Number)
    })
  })
})

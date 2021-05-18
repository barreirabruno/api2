import { CalculatePropertyPriceController } from './calculate-property-price-controller'
import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest } from '../protocols/http'

const makeRequest = (landSizeValue: any): HttpRequest => {
  return {
    body: {
      landSize: landSizeValue
    }
  }
}

describe('Calculate meter price controller', () => {
  test('Should return 400 if land size is invalid', () => {
    const sut = new CalculatePropertyPriceController()
    const httpResponse = sut.handle(makeRequest(null))
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new MissingParamError('landSize'))
  })
  test('Should return 200 on success', () => {
    const sut = new CalculatePropertyPriceController()
    const httpResponse = sut.handle(makeRequest(200))
    expect(httpResponse.statusCode).toEqual(200)
    expect(httpResponse.body).toEqual({
      landSize: 200,
      squareMeterPrice: 'any_price',
      propertyPrice: 'any_property_price'
    })
  })
})

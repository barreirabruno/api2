import { PropertyPriceModel } from '../property-price'

export const mockPropertyPrice = (landSizeValue: number): PropertyPriceModel => {
  return {
    landSize: landSizeValue,
    squareMeterPrice: 'any_price',
    propertyPrice: 100000
  }
}

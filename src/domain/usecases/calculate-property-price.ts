import { PropertyPriceModel } from '../models/property-price'

export interface PropertyPrice {
  calculate: (landSize: number) => Promise<PropertyPriceModel>
}

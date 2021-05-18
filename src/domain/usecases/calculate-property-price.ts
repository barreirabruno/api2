import { PropertyPrice } from '../models/property-price'

export interface CalculatePropertyPrice {
  calculate: (landSize: number) => PropertyPrice
}

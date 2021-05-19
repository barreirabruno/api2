export interface PropertyPriceModel {
  landSize: number
  squareMeterPrice: string
  propertyPrice: number
}

export const calculatePropertyPrice = (landSize: number, meterPrice: number): number => {
  return landSize * meterPrice
}

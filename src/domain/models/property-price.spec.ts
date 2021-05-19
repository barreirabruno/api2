export class CalculatePropertyPrice {
  propertyPrice (landSize: number, meterPrice: number): number {
    return landSize * meterPrice
  }
}

describe('Calculate property price', () => {
  test('Should calculate the property price', () => {
    const sut = new CalculatePropertyPrice()
    const propertyPrice = sut.propertyPrice(10, 10)
    expect(propertyPrice).toBe(100)
  })
})

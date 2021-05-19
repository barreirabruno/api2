import { calculatePropertyPrice } from './property-price'

describe('Calculate property price', () => {
  test('Should calculate the property price', () => {
    const sut = calculatePropertyPrice(10, 10)
    expect(sut).toBe(100)
  })
})

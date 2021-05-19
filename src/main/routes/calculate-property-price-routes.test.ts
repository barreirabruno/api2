import request from 'supertest'
import app from '../config/app'

describe('Calculate property price routes', () => {
  test('Should return a property price on success', async () => {
    await request(app)
      .post('/api//calculate-property-price')
      .send({ landSize: 1000 })
      .expect(200)
  })
})

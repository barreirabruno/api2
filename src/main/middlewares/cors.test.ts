import request from 'supertest'
import app from '../config/app'

describe('CORS middleware', () => {
  test('Should enable CORS', async () => {
    app.get('/test_cors')
    await request(app)
      .post('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})

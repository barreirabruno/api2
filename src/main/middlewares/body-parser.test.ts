import request from 'supertest'
import app from '../config/app'

describe('Body parsers middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ data: 'any_required_data' })
      .expect({ data: 'any_required_data' })
  })
})

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/calculate-property-price', (req, res) => {
    res.json({ ok: 'ok' })
  })
}

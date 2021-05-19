import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCalculatePropertyPriceController } from '../factories/calculate-property-price'

export default (router: Router): void => {
  router.post('/calculate-property-price', adaptRoute(makeCalculatePropertyPriceController()))
}

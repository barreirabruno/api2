import { RemoteCalculatePropertyPrice } from '../../data/usecases/property-price/remote-calculate-property-price'
import { AxiosHttpClient } from '../../infra/http/axios-http-client'
import { CalculatePropertyPriceController } from '../../presentation/controllers/calculate-property-price-controller'

export const makeCalculatePropertyPriceController = (): CalculatePropertyPriceController => {
  const httpClient = new AxiosHttpClient()
  const propertyPrice = new RemoteCalculatePropertyPrice('https://in-gaia-api1.herokuapp.com/api/meter-price', httpClient)
  return new CalculatePropertyPriceController(propertyPrice)
}

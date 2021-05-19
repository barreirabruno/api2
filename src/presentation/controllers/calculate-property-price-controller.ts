/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable space-before-function-paren */
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest, success } from '../helpers/httpHelpers'
import { MissingParamError } from '../errors/missing-param-error'
import { PropertyPrice } from '../../domain/usecases/calculate-property-price'

export class CalculatePropertyPriceController implements Controller {
  private readonly propertyPrice: PropertyPrice

  constructor(propertyPrice: PropertyPrice) {
    this.propertyPrice = propertyPrice
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    for (const field of ['landSize']) {
      if (httpRequest.body[field] === undefined || httpRequest.body[field] === '' || httpRequest.body[field] === null) {
        return badRequest(new MissingParamError(field))
      }
    }

    const calculatePropertyPrice = await this.propertyPrice.calculate(httpRequest.body.landSize)

    return success(calculatePropertyPrice)
  }
}

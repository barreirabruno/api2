/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable space-before-function-paren */
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest, success } from '../helpers/httpHelpers'
import { MissingParamError } from '../errors/missing-param-error'
import { PropertyPrice } from '../../domain/usecases/calculate-property-price'
import { OutOfRangeParamError } from '../errors/out-of-rang-param-error'

export class CalculatePropertyPriceController implements Controller {
  private readonly propertyPrice: PropertyPrice

  constructor(propertyPrice: PropertyPrice) {
    this.propertyPrice = propertyPrice
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    for (const field of ['landSize']) {
      if (httpRequest.body[field] === undefined || httpRequest.body[field] === '' || httpRequest.body[field] === null || isNaN(Number(httpRequest.body[field]))) {
        return badRequest(new MissingParamError(field))
      }
    }

    const { landSize } = httpRequest.body

    if (landSize < 10 || landSize > 10000) {
      return badRequest(new OutOfRangeParamError('landSize'))
    }

    const calculatePropertyPrice = await this.propertyPrice.calculate(httpRequest.body.landSize)

    return success(calculatePropertyPrice)
  }
}

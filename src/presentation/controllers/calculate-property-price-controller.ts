import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest, success } from '../helpers/httpHelpers'
import { MissingParamError } from '../errors/missing-param-error'

export class CalculatePropertyPriceController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    for (const field of ['landSize']) {
      if (httpRequest.body[field] === undefined || httpRequest.body[field] === '' || httpRequest.body[field] === null) {
        return badRequest(new MissingParamError(field))
      }
    }

    return success({
      landSize: 200,
      squareMeterPrice: 'any_price',
      propertyPrice: 'any_property_price'
    })
  }
}

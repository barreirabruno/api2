/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable space-before-function-paren */
export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing params: ${paramName}`)
    this.name = 'Missing param error'
  }
}

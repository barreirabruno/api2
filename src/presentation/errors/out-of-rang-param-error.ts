/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable space-before-function-paren */
export class OutOfRangeParamError extends Error {
  constructor(paramName: string) {
    super(`${paramName} is out of range`)
    this.name = `${paramName} is out of range`
  }
}

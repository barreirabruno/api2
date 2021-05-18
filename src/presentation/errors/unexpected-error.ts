/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable space-before-function-paren */
export class UnexpectedError extends Error {
  constructor() {
    super('Something went wrong, please try again later')
    this.name = 'UnexpectedError'
  }
}

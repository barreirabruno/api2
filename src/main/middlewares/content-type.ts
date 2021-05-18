import { Request, Response, NextFuncion } from 'express'

export const contentType = (req: Request, res: Response, next: NextFuncion): void => {
  res.type('json')
  next()
}

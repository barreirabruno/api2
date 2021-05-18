import { Request, Response, NextFuncion } from 'express'

export const cors = (req: Request, res: Response, next: NextFuncion): void => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-headers', '*')
  res.set('access-control-allow-methods', '*')
  next()
}

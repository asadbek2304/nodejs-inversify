import express, {
  NextFunction,
  Request,
  Response,
  ErrorRequestHandler,
} from 'express'

import { InversifyExpressServer } from 'inversify-express-utils'
import { Container } from 'inversify'
import { DBContext } from '@data/db.context'
import { Application, MorganMode } from './lib/abstract-application'
import { SubscribersRepository } from '@data/subscribers.repository'
import { SubscribersService } from '@logic/services/subscribers.service'

import '@web/controllers/subscribers.controller'
import { CouldNotFoundException, ValidationException } from '@logic/exceptions'
import { BaseHttpResponse } from './lib/base-http-response'
import morgan from 'morgan'

export class App extends Application {
  constructor() {
    super({
      containerOpts: {
        defaultScope: 'Singleton'
      },
      morgan: {
        mode: MorganMode.DEV
      }
    })
  }
  configureServices(container: Container): void {
    container.bind(DBContext).toSelf()
    container.bind(SubscribersRepository).toSelf()
    container.bind(SubscribersService).toSelf()
  }
  async setup() {
    const _db = this.container.get(DBContext)

    await _db.connect()
    const server = new InversifyExpressServer(this.container)

    server.setErrorConfig((app) => {
      app.use(
        (
          err: ErrorRequestHandler,
          req: Request,
          res: Response,
          next: NextFunction
        ) => {
          if (err instanceof ValidationException) {
            const response = BaseHttpResponse.failed(err.message)
            return res.status(response.statusCode).json(response)
          }

          if (err instanceof CouldNotFoundException) {
            const response = BaseHttpResponse.failed(err.message, 404)
            return res.status(response.statusCode).json(response)
          }

          if (err instanceof Error) {
            const response = BaseHttpResponse.failed(err.message, 500)
            return res.status(response.statusCode).json(response)
          }
          next()
        }
      )
    })

    server.setConfig((app) => {
      app.use(express.json())
      app.use(morgan('dev'))
    })

    const app = server.build()

    app.listen(process.env.PORT, () => {
      console.log(
        `server is running on http://localhost:${process.env.PORT}/subscribers`
      )
    })
  }
}

new App()
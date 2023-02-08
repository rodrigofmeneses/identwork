import { Express } from 'express'
import company from './company.route.js'

function init_routes(app: Express) {
  app.use('/companies', company)
}

export default init_routes
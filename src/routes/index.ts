import { Express } from 'express'
import company from './company.route'
import employee from './employee.route'

function init_routes(app: Express) {
  app.use('/companies', company)
  app.use('/employees', employee)
}

export default init_routes
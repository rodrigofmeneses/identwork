import express from 'express'
import { errorMiddleware } from './middlewares/error.js'
import init_routes from './routes/index.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.json('IdentWork'))
init_routes(app)

app.use(errorMiddleware)

export { app }

import express from 'express'
import init_routes from './routes/index.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.json('IdentWork'))
init_routes(app)

export { app }

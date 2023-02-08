import dotenv from 'dotenv'
import { app } from "./app"
dotenv.config()

const PORT = process.env.PORT || 7777

app.listen(PORT, () => {
  console.log(`Starting server on http://localhost:${PORT}`)
})
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { indexRouter } from './router'
import { errorHandler } from './errorHandler'

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express()

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use(indexRouter)
app.use(errorHandler)

app.get('/health', (req, res) => {
  res.send('OK')
})

export { app }

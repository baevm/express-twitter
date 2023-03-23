import express from 'express'
import cors from 'cors'
import { indexRouter } from './router'

const app = express()

app.use(cors())
app.use(express.json())
app.use(indexRouter)

app.get('/health', (req, res) => {
  res.send('OK')
})

export { app }

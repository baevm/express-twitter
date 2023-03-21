import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.send('OK')
})

let test = ''

export { app }
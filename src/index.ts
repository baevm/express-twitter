import { app } from '@config/express'

const PORT = process.env.PORT || 5000

async function init() {
  app.listen(PORT, () => console.log('started server on port:', PORT))
}

init()

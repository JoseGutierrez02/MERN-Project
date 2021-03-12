import express from 'express'
import config from './config'

const app = express()

app.set('port', config.PORT || 3000)

export default app
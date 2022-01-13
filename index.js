require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const winston = require('./src/v1/util/config/winston')
const helmet = require('helmet')
const routeV1 = require('./src/v1/route/index.route')

const app = express()
const HOST = process.env.HOST
const PORT = process.env.PORT

app.use(express.json())
app.use(morgan('combined', { stream: winston.stream }));
app.use(helmet())
app.use('/v1', routeV1)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => {
    console.log(`server is listening on http://${HOST}:${PORT}`)
})

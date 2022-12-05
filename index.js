const express = require('express')
const swaggerUi = require('swagger-ui-express')
const dotenv = require('dotenv')
const cors = require('cors')
require('colors')

const swaggerDocument = require('./swagger.json')

const connectDB = require('./config/db')

const clientsRoutes = require('./routes/clientsRoutes')
const providerRoutes = require('./routes/providerRoutes')

// config
const port = process.env.PORT || 5000
dotenv.config()

// init express and connect to DB
const app = express()
connectDB()

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use(
	'/api/docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument, { explorer: true })
)
app.use('/api/clients', clientsRoutes)
app.use('/api/providers', providerRoutes)

app.listen(port, () => {
	console.log(`Server is running at https://localhost:${port}`.green.bold)
})

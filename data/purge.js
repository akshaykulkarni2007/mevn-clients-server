const dotenv = require('dotenv')

const Client = require('../models/clientModel')
const Provider = require('../models/providerModel')

const connectDB = require('../config/db')

dotenv.config()
connectDB()

const purge = async () => {
	await Provider.deleteMany()
	await Client.deleteMany()
	console.log(`Data purged`.bgYellow)

	process.exit(0)
}

purge()

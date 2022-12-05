const dotenv = require('dotenv')

const Client = require('../models/clientModel')
const Provider = require('../models/providerModel')

const connectDB = require('../config/db')

const { clients, providers } = require('./data.json')

dotenv.config()
connectDB()

const mapProviders = (providers) => {
	return new Array(Math.floor(Math.random() * 3) + 1)
		.fill(1)
		.map(() =>
			providers[Math.floor(Math.random() * providers.length)]._id.toString()
		)
}

const seed = async () => {
	const addedProviders = await Provider.insertMany(providers)

	await Client.insertMany(
		clients.map((client) => ({
			...client,
			providers: mapProviders(addedProviders),
		}))
	)

	console.log(`Data created`.bgGreen)

	process.exit(0)
}

seed()

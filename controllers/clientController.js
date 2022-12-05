const asyncHandler = require('express-async-handler')

const Client = require('../models/clientModel')

// @desc    Get clients
// @route   GET /api/clients
const getClients = asyncHandler(async (req, res) => {
	const clients = await Client.find().populate('providers')

	res.status(200).json(clients)
})

// @desc    Get client by id
// @route   GET /api/client/:id
const getClient = asyncHandler(async (req, res) => {
	const client = await Client.findById(req.params.id)

	res.status(200).json(client)
})

// @desc    Add client
// @route   POST /api/client
const addClient = asyncHandler(async (req, res) => {
	const { name, email, phone, providers } = req.body
	if (!name || !email || !phone) {
		res.status(400)
		throw new Error('Please add name')
	}

	const response = await Client.create({
		name,
		email,
		phone,
		providers,
	})

	const client = await Client.findById(response._id).populate('providers')

	res.status(200).json(client)
})

// @desc    Update client
// @route   PUT /api/client/:id
const updateClient = asyncHandler(async (req, res) => {
	const client = await Client.findById(req.params.id)

	if (!client) {
		res.status(400)
		throw new Error('Client not found')
	}

	const response = await Client.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	})

	const updatedClient = await Client.findById(response._id).populate(
		'providers'
	)

	res.status(200).json(updatedClient)
})

// @desc    Delete client
// @route   DELETE /api/client/:id
const deleteClient = asyncHandler(async (req, res) => {
	const client = await Client.findById(req.params.id)

	if (!client) {
		res.status(400)
		throw new Error('Client not found')
	}

	await client.remove()

	res.status(200).json({ id: req.params.id })
})

module.exports = {
	getClients,
	getClient,
	addClient,
	updateClient,
	deleteClient,
}

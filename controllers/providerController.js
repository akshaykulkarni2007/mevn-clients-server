const asyncHandler = require('express-async-handler')

const Provider = require('../models/providerModel')

// @desc    Get providers
// @route   GET /api/providers
const getProviders = asyncHandler(async (req, res) => {
	const providers = await Provider.find()

	res.status(200).json(providers)
})

// @desc    Get provider by id
// @route   GET /api/provider/:id
const getProvider = asyncHandler(async (req, res) => {
	const provider = await Provider.findById(req.params.id)

	res.status(200).json(provider)
})

// @desc    Add provider
// @route   POST /api/provider
const addProvider = asyncHandler(async (req, res) => {
	const { name } = req.body

	if (!name) {
		res.status(400)
		throw new Error('Please add name')
	}

	const provider = await Provider.create({
		name,
	})

	res.status(200).json(provider)
})

// @desc    Update provider
// @route   PUT /api/provider/:id
const updateProvider = asyncHandler(async (req, res) => {
	const provider = await Provider.findById(req.params.id)

	if (!provider) {
		res.status(400)
		throw new Error('Provider not found')
	}

	const updatedProvider = await Provider.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	)

	res.status(200).json(updatedProvider)
})

// @desc    Delete provider
// @route   DELETE /api/provider/:id
const deleteProvider = asyncHandler(async (req, res) => {
	const provider = await Provider.findById(req.params.id)

	if (!provider) {
		res.status(400)
		throw new Error('Provider not found')
	}

	await provider.remove()

	res.status(200).json({ id: req.params.id })
})

module.exports = {
	getProviders,
	getProvider,
	addProvider,
	updateProvider,
	deleteProvider,
}

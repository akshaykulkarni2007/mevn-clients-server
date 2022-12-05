const express = require('express')

const router = express.Router()

const {
	getProviders,
	getProvider,
	addProvider,
	updateProvider,
	deleteProvider,
} = require('../controllers/providerController')

router.route('/').get(getProviders).post(addProvider)
router.route('/:id').get(getProvider).put(updateProvider).delete(deleteProvider)

module.exports = router

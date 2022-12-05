const express = require('express')

const router = express.Router()

const {
	getClients,
	getClient,
	addClient,
	updateClient,
	deleteClient,
} = require('../controllers/clientController')

router.route('/').get(getClients).post(addClient)
router.route('/:id').get(getClient).put(updateClient).delete(deleteClient)

module.exports = router

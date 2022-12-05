const mongoose = require('mongoose')

const providerSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Provider', providerSchema)

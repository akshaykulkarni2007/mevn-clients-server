const mongoose = require('mongoose')

const clientSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please add a valid email',
			],
		},
		phone: {
			type: String,
			required: true,
		},
		providers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: 'Provider',
			},
		],
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Client', clientSchema)

const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
	name: {
		type: String,
		required: [true, "El nombre es obligatorio"],
		unique: true,
	},
	isActive: {
		type: Boolean,
		default: true,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

CategorySchema.methods.toJSON = function () {
	const { __v, ...rest } = this.toObject();
	// rest.id = _id;
	return rest;
};

module.exports = model("Category", CategorySchema);

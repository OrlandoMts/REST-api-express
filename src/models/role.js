const { Schema, model } = require("mongoose");

const RoleSchema = new Schema({
	role: {
		type: String,
		required: [true, "El rol es obligatorio"],
	},
	description: {
		type: String,
	},
});

module.exports = model("Role", RoleSchema);

const { Schema, model } = require("mongoose");
const { USER_ADMIN, USER_NORMAL, USER_VISITOR } = require("../config/roles");

const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, "No ingresaste un usuario"],
	},
	email: {
		type: String,
		required: [true, "El correo es obligatorio"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "La contraseña es obligatoria"],
	},
	img: {
		type: String,
	},
	role: {
		type: String,
		required: true,
		enum: [USER_ADMIN, USER_NORMAL, USER_VISITOR],
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
});

module.exports = model("User", UserSchema); //mongoose por defecto le agrega una 's' al final del string -> Users

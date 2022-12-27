const { Schema, model } = require("mongoose");
const {
	USER_ADMIN,
	USER_NORMAL,
	USER_VISITOR,
	USER_SALES,
} = require("../config/roles");

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
		enum: [USER_ADMIN, USER_NORMAL, USER_VISITOR, USER_SALES],
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

// NOTE: debe ser una funcion normal para sobreecribir el metodo (se necesita mantener el this de la instancia)
UserSchema.methods.toJSON = function () {
	const { __v, password, ...rest } = this.toObject(); // ...rest: todos las demas propiedades
	return rest;
};

module.exports = model("User", UserSchema); //mongoose por defecto le agrega una 's' al final del string -> Users

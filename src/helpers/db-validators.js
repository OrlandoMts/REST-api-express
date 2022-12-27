const { response } = require("express");
const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
	const isRole = await Role.findOne({ role });
	if (!isRole) {
		throw new Error(`El ${role} no existe en la bd`); // Asi se lanza un error personalizado en express validator
	}
};

const isValidEmail = async (email = "") => {
	const emailRegister = await User.findOne({ email });
	if (emailRegister) {
		return res.status(400).json({
			msg: "El correo ya ha sido registrado",
		});
	}
};

module.exports = { isValidRole, isValidEmail };

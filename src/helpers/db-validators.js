const Role = require("../models/role");
const User = require("../models/user");

const isUserById = async (id = "") => {
	const isUser = await User.findById(id);
	if (!isUser) {
		throw new Error("El usuario con ese id no existe");
	}
};

const isValidRole = async (role = "") => {
	const isRole = await Role.findOne({ role });
	if (!isRole) {
		throw new Error(`El ${role} no existe en la bd`); // Asi se lanza un error personalizado en express validator
	}
};

const isValidEmail = async (email = "") => {
	const emailRegister = await User.findOne({ email });
	if (emailRegister) {
		throw new Error(`El ${email} ya existe en la bd`);
	}
};

module.exports = { isUserById, isValidRole, isValidEmail };

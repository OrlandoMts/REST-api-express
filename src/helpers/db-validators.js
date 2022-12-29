const { Role, User, Category } = require("../models");
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

const isCategory = async (id = "") => {
	const category = await Category.findById(id);
	if (!category) {
		throw new Error(`La categoria con ${id} no ha sido registrado en la bd`);
	}
};

module.exports = { isUserById, isValidRole, isValidEmail, isCategory };

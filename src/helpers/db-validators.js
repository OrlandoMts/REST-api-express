const { Role, User, Category, Product } = require("../models");
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
	if (category.isActive == false) {
		throw new Error(`La categoria con ${id} fue dada de baja`);
	}
};

const isProduct = async (id = "") => {
	const product = await Product.findById(id);
	if (!product) {
		throw new Error(`El producto ${id} no ha sido registrado en la bd`);
	}
	if (product.status == false) {
		throw new Error(`El producto con ${id} fue dada de baja`);
	}
};

const verifyPrice = async (price) => {
	if (price < 0) {
		throw new Error(`No se pueden ingresar precios menores a 0`);
	}
};

module.exports = {
	isUserById,
	isValidRole,
	isValidEmail,
	isCategory,
	isProduct,
	verifyPrice,
};

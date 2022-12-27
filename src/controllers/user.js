const { request, response } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const saltRounds = 10;

const getUsers = async (req = request, res = response) => {
	try {
		const { limit = 5, from = 0 } = req.query;
		// NOTE: Lo que sea que ponga en una posicion, es el resultado de dicha posicion
		const [users, totalUser] = await Promise.all([
			User.find({ isActive: true }).skip(Number(from)).limit(Number(limit)),
			User.countDocuments({ isActive: true }),
		]);

		res.json({
			msg: "Obteniendo los usuarios",
			users,
			total: totalUser,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({
			msg: "Contacta al administrador",
		});
	}
};

const postUser = async (req = request, res = response) => {
	try {
		const { name, email, password, role } = req.body;
		const user = new User({ name, email, password, role });
		//NOTE: 1.Encriptar password. 3.Insertar en bd
		// 1
		const salt = bcrypt.genSaltSync(saltRounds);
		user.password = bcrypt.hashSync(password, salt);
		// 2
		await user.save();
		res.json({
			msg: "Bienvenido",
			user,
		});
	} catch (error) {
		res.status(400).json({
			msg: "Contacta al administrador",
		});
	}
};

const putUser = async (req = request, res = response) => {
	try {
		const { id } = req.params;
		const { _id, password, google, email, ...rest } = req.body;
		// Valida si viene el password
		if (password) {
			const salt = bcrypt.genSaltSync(saltRounds);
			rest.password = bcrypt.hashSync(password, salt);
		}
		const user = await User.findByIdAndUpdate(id, rest);
		res.json({
			msg: "Usuario actualizado",
			user,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			msg: "Contacta al administrador",
		});
	}
};

const deleteUser = async (req = request, res = response) => {
	const { id } = req.params;
	const uid = req.uid; //Se le asigno en el middleware validate-jwt

	try {
		const user = await User.findByIdAndUpdate(id, { isActive: false });
		res.json({
			msg: "Usuario dado de baja",
			user,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Contacta al administrador",
		});
	}
};

module.exports = { getUsers, postUser, putUser, deleteUser };

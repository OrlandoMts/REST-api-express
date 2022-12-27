const { request, response } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { isValidEmail } = require("../helpers/db-validators");
const saltRounds = 10;

const getUser = (req = request, res = response) => {
	const { query } = req;
	res.json({
		msg: "get Hola mundo",
		query,
	});
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
		console.log(error);
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
		res.status(404).json({
			msg: "Contacta al administrador",
		});
	}
};

const deleUser = (req, res) => {
	res.json({
		msg: "delete Hola mundo",
	});
};

module.exports = { getUser, postUser, putUser, deleUser };

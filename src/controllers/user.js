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
		//NOTE: 1.Verificar el correo. 2.Encriptar password. 3.Insertar en bd
		// 1
		isValidEmail(email);
		// 2
		const salt = bcrypt.genSaltSync(saltRounds);
		user.password = bcrypt.hashSync(password, salt);
		// 3
		await user.save();
		res.json({
			msg: "Bienvenido",
			user,
		});
	} catch (error) {
		console.log(error);
	}
};

const putUser = (req = request, res = response) => {
	const id = req.params.id;
	try {
		res.json({
			msg: "put Hola mundo",
			id,
		});
	} catch (error) {
		res.status(404).json({
			msg: "No existe esa url",
		});
	}
};

const deleUser = (req, res) => {
	res.json({
		msg: "delete Hola mundo",
	});
};

module.exports = { getUser, postUser, putUser, deleUser };

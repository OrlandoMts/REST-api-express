const { request, response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { genereteJWT } = require("../helpers/generete-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req = request, res = response) => {
	const { email, password } = req.body;
	//TODO: 1.El email existe? 2.El usuario esta activo? 3.Verificar contraseña 4.Generar JWT
	try {
		//1
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				msg: "Usuario/Password incorrectos",
			});
		}
		// 2
		if (!user.isActive) {
			return res.status(400).json({
				msg: "Usuario/Password incorrectos",
			});
		}
		// 3
		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				msg: "Usuario/Password incorrectos",
			});
		}
		// 4
		const token = await genereteJWT(user.id);

		res.json({
			msg: "Inicio de sesion",
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Contacta al administrador",
		});
	}
};

const googleSigIn = async (req = request, res = response) => {
	const { id_token } = req.body;
	try {
		// const googleSesion = await googleVerify(id_token);
		const googleSesion = await googleVerify(id_token);
		res.status(200).json({
			msg: "Todo bien",
			id_token,
		});
	} catch (error) {
		res.status(401).json({
			msg: "Token de google no valid",
		});
	}
};

module.exports = { login, googleSigIn };

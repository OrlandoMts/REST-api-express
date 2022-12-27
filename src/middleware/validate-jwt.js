const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
	const token = req.header("Authorization");
	if (!token) {
		return res.status(401).json({
			msg: "No hay token en la peticion",
		});
	}

	try {
		const { uid } = jwt.verify(token, process.env.JWTSECRET);
		const userLogged = await User.findById(uid);

		if (!userLogged) {
			return res.status(401).json({
				msg: "Token no valido - no se encontro ese usuario en db",
			});
		}
		if (!userLogged.isActive) {
			return res.status(401).json({
				msg: "Token no valido - usuario inactivo",
			});
		}
		req.uid = uid; //Lo envia en la request, este llegará hasta el controlador
		req.userLogged = userLogged;

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			msg: "Token no valido",
		});
	}
};

module.exports = { validateJWT };

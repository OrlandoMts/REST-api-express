const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const validateJWT = async (req = request, res = response, next) => {
	const bearer = req.header("Authorization");
	const auxBearer = bearer.split("Bearer ");
	const token = auxBearer[auxBearer.length - 1];
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
			msg: "Token no valido - El token expiró, Intenta iniciar sesión",
		});
	}
};

module.exports = { validateJWT };

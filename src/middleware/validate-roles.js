const { request, response } = require("express");
const { USER_ADMIN } = require("../config/roles");

const validateRoleAdmin = (req = request, res = response, next) => {
	const userLogged = req.userLogged;
	try {
		if (!userLogged) {
			return res.status(500).json({
				msg: "Se quiere verificar el rol sin tener primero un token valido",
			});
		}
		const { name, role } = userLogged;
		if (role !== USER_ADMIN) {
			return res.status(401).json({
				msg: `${name}, no tiene permisos de administrador`,
			});
		}
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			msg: "Contacta al administrador",
		});
	}
};

const hasRole = (...roles) => {
	/**
	 * NOTE: Todo los middlewares son un callback con esos argumentos. En las rutas no se ejecutan,
	 * se pasan por referencia. hasRole si se esta mandando a llamar, por eso hay que retornar una callback
	 */
	return (req = request, res = response, next) => {
		if (!req.userLogged) {
			return res.status(500).json({
				msg: "Se quiere verificar el rol sin tener primero un token valido",
			});
		}
		const currentRole = req.userLogged.role;
		if (!roles.includes(currentRole)) {
			return res.status(401).json({
				msg: "No cuentas con los roles necesarios",
			});
		}
		next();
	};
};

module.exports = {
	validateRoleAdmin,
	hasRole,
};

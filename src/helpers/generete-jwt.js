const JWT = require("jsonwebtoken");

const genereteJWT = (uid = "") => {
	return new Promise((resolve, reject) => {
		const payload = { uid };
		JWT.sign(
			payload,
			process.env.JWTSECRET,
			{
				expiresIn: "4h",
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject("No se pudo generar el token");
				} else {
					resolve(token);
				}
			}
		);
	});
};

module.exports = { genereteJWT };

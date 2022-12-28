const { Router } = require("express");
const { check } = require("express-validator");
const {
	getUsers,
	putUser,
	postUser,
	deleteUser,
} = require("../controllers/user");
const {
	isValidRole,
	isValidEmail,
	isUserById,
} = require("../helpers/db-validators");
const {
	validateField,
	validateJWT,
	validateRoleAdmin,
	hasRole,
} = require("../middleware");

const router = Router();

router.get("/", [validateJWT], getUsers);

router.put(
	"/:id",
	[
		check("id", "No es un id valido").isMongoId(),
		check("id").custom(isUserById),
		check("role").custom(isValidRole),
		validateField,
	],
	putUser
);

router.post(
	"/new",
	[
		check("name", "Ingresa tu nombre").not().isEmpty(),
		check("password", "Ingresa una contraseña mayor a 6 caracteres").isLength({
			min: 6,
		}),
		// check("email", "Ingresa un correo valido").isEmail(),
		check("email").custom(isValidEmail),
		// check("role", "No es un rol válido").isIn([
		// 	USER_ADMIN,
		// 	USER_NORMAL,
		// 	USER_VISITOR,
		// ]),
		check("role").custom(isValidRole), // es igual a (role) => isValidRole(role)
		validateField,
	],
	postUser
);

router.delete(
	"/:id",
	[
		validateJWT,
		// validateRoleAdmin, //Middleware estricto
		hasRole("USER_ADMIN", "USER_SALES"), //Middleware flexible
		check("id", "No es un id valido").isMongoId(),
		check("id").custom(isUserById),
		validateField,
	],
	deleteUser
);

module.exports = router;

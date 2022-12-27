const { Router } = require("express");
const { getUser, putUser, postUser, deleUser } = require("../controllers/user");
const { check } = require("express-validator");
const { USER_ADMIN, USER_NORMAL, USER_VISITOR } = require("../config/roles");
const { validateField } = require("../middleware/validate-fields");
const { isValidRole, isValidEmail } = require("../helpers/db-validators");

const router = Router();

router.get("/hw", getUser);

router.put("/:id", putUser);

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

router.delete("/", deleUser);

module.exports = router;

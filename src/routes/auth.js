const { Router } = require("express");
const { login } = require("../controllers/auth");
const { check } = require("express-validator");
const { validateField } = require("../middleware/validate-fields");

const router = Router();

router.post(
	"/login",
	[
		check("email", "El correo es obligatorio").isEmail(),
		check("password", "La contraseña es obligatoria").not().isEmpty(),
		validateField,
	],
	login
);

module.exports = router;

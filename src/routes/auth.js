const { Router } = require("express");
const { login, googleSigIn } = require("../controllers/auth");
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
router.post(
	"/google",
	[
		check("id_token", "El token de google es requierdo").not().isEmpty(),
		validateField,
	],
	googleSigIn
);

module.exports = router;

const { Router } = require("express");
const { check } = require("express-validator");
const { validateField } = require("../middleware/validate-fields");
const {
	newCategory,
	getCategory,
	getCategories,
	deleteCategory,
	updateCategory,
} = require("../controllers/categories");
const { validateJWT, validateRoleAdmin } = require("../middleware");
const { isCategory } = require("../helpers/db-validators");

const router = Router();

router.get("/list", getCategories);

router.get(
	"/:id",
	[
		check("id", "No es un identificador valido").isMongoId(),
		check("id").custom(isCategory),
		validateField,
	],
	getCategory
);

// Cualquiera con token valido
router.post(
	"/new",
	[
		validateJWT,
		check("name", "El nombre es requerido").not().isEmpty(),
		validateField,
	],
	newCategory
);

// Cualquiera con token valido
router.put(
	"/:id",
	[
		validateJWT,
		check("id", "Ingresa un id valido").isMongoId(),
		check("name", "El nombre es requerido").not().isEmpty(),
		check("id").custom(isCategory),
		validateField,
	],
	updateCategory
);

// Solo USER_ADMIN
router.delete(
	"/:id",
	[
		validateJWT,
		validateRoleAdmin,
		check("id", "No es un identificador valido").isMongoId(),
		check("id").custom(isCategory),
		validateField,
	],
	deleteCategory
);

module.exports = router;

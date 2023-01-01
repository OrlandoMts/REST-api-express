const { Router } = require("express");
const {
	getProducts,
	getProduct,
	newProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/products");
const { check } = require("express-validator");
const {
	validateJWT,
	validateField,
	validateRoleAdmin,
} = require("../middleware");
const {
	isCategory,
	isProduct,
	verifyPrice,
} = require("../helpers/db-validators");

const router = Router();

// /api/v1/products
router.get("/list", getProducts);
router.get(
	"/:id",
	[
		check("id", "No es un identificador valido").isMongoId(),
		check("id").custom(isProduct),
		validateField,
	],
	getProduct
);
router.post(
	"/new",
	[
		validateJWT,
		check("name", "El nombre es obligatorio").not().isEmpty(),
		check("price").optional().custom(verifyPrice),
		check("category", "No es un id valido de mongo").isMongoId(),
		check("category").custom(isCategory),
		check(
			"description",
			"La descripción debe contener más de 3 letras"
		).isLength({ min: 3 }),
		validateField,
	],
	newProduct
);
router.put(
	"/:id",
	[
		validateJWT,
		check("id", "Ingresa un id valido").isMongoId(),
		check("id").custom(isProduct),
		check("name", "El nombre es requerido").not().isEmpty(),
		check("price").custom(verifyPrice),
		check(
			"description",
			"La descripción debe contener más de 3 letras"
		).isLength({ min: 3 }),
		check("available", "Debes especificar true o false").isBoolean(),
		validateField,
	],
	updateProduct
);
router.delete(
	"/:id",
	[
		validateJWT,
		validateRoleAdmin,
		check("id", "No es un identificador valido").isMongoId(),
		check("id").custom(isProduct),
		validateField,
	],
	deleteProduct
);

module.exports = router;

const { Router } = require("express");
const { check } = require("express-validator");
const {
	uploadFile,
	updateImgPicture,
	showImg,
} = require("../controllers/uploads");
const { validateJWT, validateFile, validateField } = require("../middleware");
const { collectionsAllow } = require("../helpers");

const router = Router();
router.get(
	"/:collection/:id",
	[
		validateJWT,
		check("id", "El id deb ser un id mongo valido").isMongoId(),
		check("collection").custom((c) =>
			collectionsAllow(c, ["users", "products", "categories"])
		),
		validateField,
	],
	showImg
);
router.post("/", [validateJWT, validateFile, validateField], uploadFile);
router.put(
	"/:collection/:id",
	[
		validateJWT,
		check("id", "El id deb ser un id mongo valido").isMongoId(),
		check("collection").custom((c) =>
			collectionsAllow(c, ["users", "products", "categories"])
		),
		validateFile,
		validateField,
	],
	updateImgPicture
);

module.exports = router;

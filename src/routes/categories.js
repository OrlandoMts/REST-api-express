const { Router } = require("express");
const { check } = require("express-validator");
const { validateField } = require("../middleware/validate-fields");

const router = Router();

router.get("/list", (req, res) => {
	res.json({
		msg: "lista de categorias",
	});
});

router.get("/:id", (req, res) => {
	res.json({
		msg: "una categoria",
	});
});

// Cualquiera con token valido
router.post("/", (req, res) => {
	res.json({
		msg: "nueva categoria",
	});
});

// Cualquiera con token valido
router.put("/:id", (req, res) => {
	res.json({
		msg: "editar categoria",
	});
});

// Solo USER_ADMIN
router.delete("/:id", (req, res) => {
	res.json({
		msg: "dar de baja categoria",
	});
});

module.exports = router;

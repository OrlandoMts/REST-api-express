const { Router } = require("express");
const { getUser, putUser, postUser, deleUser } = require("../controllers/user");
const { check } = require("express-validator");

const router = Router();

router.get("/hw", getUser);

router.put("/:id", putUser);

router.post(
	"/new",
	check("email", "Ingresa un correo valido").isEmail(),
	postUser
);

router.delete("/", deleUser);

module.exports = router;

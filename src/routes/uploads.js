const { Router } = require("express");
const { check } = require("express-validator");
const { validateField } = require("../middleware/validate-fields");
const { uploadFile } = require("../controllers/uploads");
const { validateJWT } = require("../middleware");

const router = Router();

router.post("/", [validateJWT, validateField], uploadFile);

module.exports = router;

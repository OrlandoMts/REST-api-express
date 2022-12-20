const { Router } = require("express");
const { getUser, putUser, postUser, deleUser } = require("../controllers/user");

const router = Router();

router.get("/hw", getUser);

router.put("/:id", putUser);

router.post("/new", postUser);

router.delete("/", deleUser);

module.exports = router;

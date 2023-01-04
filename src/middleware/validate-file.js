const { request, response } = require("express");

const validateFile = (req = request, res = response, next) => {
	if (!req.files || Object.keys(req.files).length === 0 || !req.files.media) {
		res.status(400).json({ msg: "No hay archivos por cargar. validateFile" });
		return;
	}

	next();
};

module.exports = {
	validateFile,
};

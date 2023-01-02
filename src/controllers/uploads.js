const { response, request } = require("express");
const { uploadFiles } = require("../helpers");
const { COMMON_FILES } = require("../config/paths");

const uploadFile = async (req = request, res = response) => {
	try {
		if (!req.files || Object.keys(req.files).length === 0 || !req.files.media) {
			res.status(400).json({ msg: "No hay archivos por cargar." });
			return;
		}

		try {
			const nameFile = await uploadFiles(req.files, COMMON_FILES);
			// const nameFile = await uploadFiles(req.files, ["pdf", "msg"], "docs");
			res.json({
				nameFile,
			});
		} catch (msg) {
			res.status(400).json({ msg });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Algo salio mal al cargar el archivo, por favor contacte al administrador",
		});
	}
};

module.exports = {
	uploadFile,
};

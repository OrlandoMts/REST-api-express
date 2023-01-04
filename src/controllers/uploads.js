const path = require("path");
const fs = require("fs");

const { response, request } = require("express");
const { uploadFiles, uploadSeveralFiles } = require("../helpers");
const { COMMON_FILES } = require("../config/paths");
const { User, Product } = require("../models");

const deletePrevImg = (img, collection) => {
	// Direccion completa y borrado del servidor
	const pathImage = path.join(__dirname, `../uploads/${collection}`, img);
	if (fs.existsSync(pathImage)) {
		fs.unlinkSync(pathImage);
	}
};

const uploadFile = async (req = request, res = response) => {
	console.log(req.files["media"].length > 1);
	try {
		if (req.files["media"].length > 1) {
			await uploadSeveralFiles(req.files, COMMON_FILES)
				.then((nameFile) =>
					res.json({
						nameFile,
					})
				)
				.catch((reason) => res.status(400).json(reason));
			return;
		}
		await uploadFiles(req.files, COMMON_FILES)
			.then((nameFile) =>
				res.json({
					nameFile,
				})
			)
			.catch((reason) => res.status(400).json(reason));
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Algo salio mal al cargar el archivo, por favor contacte al administrador",
		});
	}
};

const updateImgPicture = async (req = request, res = response) => {
	const { id, collection } = req.params;
	let modelo;

	try {
		switch (collection) {
			case "users":
				modelo = await User.findById(id);
				if (!modelo) {
					return res.status(400).json({
						msg: `No existe un usuario con el id ${id}`,
					});
				}
				break;
			case "products":
				modelo = await Product.findById(id);
				if (!modelo) {
					return res.status(400).json({
						msg: `No existe un producto con el id ${id}`,
					});
				}
				break;
			default:
				return res.status(500).json({
					msg: "Olvide validar esa coleccion",
				});
		}

		//  Eliminar imagenes previas
		if (modelo.img) {
			deletePrevImg(modelo.img, collection);
		}

		const nameFile = await uploadFiles(req.files, COMMON_FILES, collection);
		modelo.img = nameFile;
		await modelo.save();

		res.json(modelo);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Algo salio mal al cargar el archivo, por favor contacte al administrador",
		});
	}
};

const showImg = async (req = request, res = response) => {
	const { id, collection } = req.params;
	let modelo;
	try {
		switch (collection) {
			case "users":
				modelo = await User.findById(id);
				if (!modelo) {
					return res.status(400).json({
						msg: `No existe un usuario con el id ${id}`,
					});
				}
				break;
			case "products":
				modelo = await Product.findById(id);
				if (!modelo) {
					return res.status(400).json({
						msg: `No existe un producto con el id ${id}`,
					});
				}
				break;
			default:
				return res.status(500).json({
					msg: "Olvide validar esa coleccion",
				});
		}

		if (modelo.img) {
			const pathImage = path.join(
				__dirname,
				`../uploads/${collection}`,
				modelo.img
			);
			if (fs.existsSync(pathImage)) {
				return res.sendFile(pathImage);
			}
		} else {
			const pathImage = path.join(__dirname, "../assets/no-image.jpg");
			return res.status(400).sendFile(pathImage);
		}

		// res.json({
		// 	msg: `Obteniendo imagen de ${collection}`,
		// });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Algo salio mal al cargar el archivo, por favor contacte al administrador",
		});
	}
};

module.exports = {
	uploadFile,
	updateImgPicture,
	showImg,
};

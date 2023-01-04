const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { COMMON_FILES } = require("../config/paths");

const uploadSeveralFiles = (
	files,
	validExtension = COMMON_FILES,
	folder = ""
) => {
	const { media } = files;
	return new Promise((resolve, reject) => {
		media.forEach((m, index) => {
			const mediaName = m.name.split(".");
			const extension = mediaName[mediaName.length - 1];
			const extensionName = mediaName[mediaName.length - 2];
			if (!validExtension.includes(extension)) {
				return reject(
					`Los archivos permitidos son: ${validExtension}. El archivo ${m.name[index]} no se cargo`
				);
			}
			// Cambia el nombre del archivo
			const nameTemp = uuidv4() + "_" + extensionName + "." + extension;
			// En este caso __dirname llega hasta el controller
			const uploadPath = path.join(__dirname, `../uploads/${folder}`, nameTemp);
			m.mv(uploadPath, (err) => {
				if (err) {
					return reject(
						`No se logro mover el archivo a su carpeta destino devido a: ${err}`
					);
				}
			});
		});
		resolve({
			msg: "Archivos cargados",
			archivos: media,
		});
	});
};

const uploadFiles = (files, validExtension = COMMON_FILES, folder = "") => {
	return new Promise((resolve, reject) => {
		const { media } = files;
		const mediaName = media.name.split(".");
		const extension = mediaName[mediaName.length - 1];
		const extensionName = mediaName[mediaName.length - 2];

		if (!validExtension.includes(extension)) {
			return reject(`Los archivos permitidos son: ${validExtension}`);
		}
		// Cambia el nombre del archivo
		const nameTemp = uuidv4() + "_" + extensionName + "." + extension;
		// En este caso __dirname llega hasta el controller
		const uploadPath = path.join(__dirname, `../uploads/${folder}`, nameTemp);
		media.mv(uploadPath, (err) => {
			if (err) {
				return reject(
					`No se logro mover el archivo a su carpeta destino devido a: ${err}`
				);
			}
			resolve(nameTemp);
		});
	});
};

module.exports = {
	uploadSeveralFiles,
	uploadFiles,
};

// NOTE: Es util para cargar uno por uno
/* const uploadFiles = (files, validExtension = COMMON_FILES, folder = "") => {
	return new Promise((resolve, reject) => {
		const { media } = files;
		const mediaName = media.name.split(".");
		const extension = mediaName[mediaName.length - 1];
		const extensionName = mediaName[mediaName.length - 2];

		if (!validExtension.includes(extension)) {
			return reject(`Los archivos permitidos son: ${validExtension}`);
		}
		// Cambia el nombre del archivo
		const nameTemp = uuidv4() + "_" + extensionName + "." + extension;
		// En este caso __dirname llega hasta el controller
		const uploadPath = path.join(__dirname, `../uploads/${folder}`, nameTemp);
		media.mv(uploadPath, (err) => {
			if (err) {
				return reject(
					`No se logro mover el archivo a su carpeta destino devido a: ${err}`
				);
			}
			resolve(nameTemp);
		});
	});
}; */

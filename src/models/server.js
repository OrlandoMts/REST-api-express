const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");
const fileUpload = require("express-fileupload");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.paths = {
			user: "/api/v1/user",
			auth: "/api/v1/auth",
			category: "/api/v1/category",
			products: "/api/v1/product",
			search: "/api/v1/search",
			file: "/api/v1/file",
		};
		// Connection db
		this.conectDB();
		// Middlewares
		this.middlewares();

		this.routes();
	}

	middlewares() {
		this.app.use(cors());
		// this.app.use(express.urlencoded());
		this.app.use(express.json());
		// Directorio publico
		this.app.use(express.static("public"));
		// Caraga de archivos
		this.app.use(
			fileUpload({
				useTempFiles: true,
				tempFileDir: "/tmp/",
				createParentPath: true,
			})
		);
	}

	async conectDB() {
		await dbConnection();
	}

	routes() {
		// Ruta personalizada
		this.app.use(this.paths.auth, require("../routes/auth"));
		this.app.use(this.paths.user, require("../routes/user"));
		this.app.use(this.paths.category, require("../routes/categories"));
		this.app.use(this.paths.products, require("../routes/products"));
		this.app.use(this.paths.search, require("../routes/searches"));
		this.app.use(this.paths.file, require("../routes/uploads"));
	}

	listen() {
		this.app.listen(this.port, () =>
			console.log("Proceso corriendo en el puerto: ", this.port)
		);
	}
}

module.exports = { Server };

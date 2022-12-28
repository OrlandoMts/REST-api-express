const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.paths = {
			user: "/api/v1/user",
			auth: "/api/v1/auth",
			category: "/api/v1/category",
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
	}

	async conectDB() {
		await dbConnection();
	}

	routes() {
		// Ruta personalizada
		this.app.use(this.paths.auth, require("../routes/auth"));
		this.app.use(this.paths.user, require("../routes/user"));
		this.app.use(this.paths.category, require("../routes/categories"));
	}

	listen() {
		this.app.listen(this.port, () =>
			console.log("Proceso corriendo en el puerto: ", this.port)
		);
	}
}

module.exports = { Server };

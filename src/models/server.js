const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.pathUser = `${process.env.API}/user`;
		this.pathAuth = `${process.env.API}/auth`;

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
		this.app.use(this.pathAuth, require("../routes/auth"));
		this.app.use(this.pathUser, require("../routes/user"));
	}

	listen() {
		this.app.listen(this.port, () =>
			console.log("Proceso corriendo en el puerto: ", this.port)
		);
	}
}

module.exports = { Server };

const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		mongoose.set("strictQuery", false);
		await mongoose.connect(process.env.MONGOCONN);
		console.log("Conexion exitosa!");
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

module.exports = { dbConnection };

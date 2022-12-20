const { request, response } = require("express");

const getUser = (req = request, res = response) => {
	const { query } = req;
	res.json({
		msg: "get Hola mundo",
		query,
	});
};

const postUser = (req, res) => {
	const { body } = req;
	res.json({
		msg: "post Hola mundo",
		body,
	});
};

const putUser = (req = request, res = response) => {
	const id = req.params.id;
	try {
		res.json({
			msg: "put Hola mundo",
			id,
		});
	} catch (error) {
		res.status(404).json({
			msg: "No existe esa url",
		});
	}
};

const deleUser = (req, res) => {
	res.json({
		msg: "delete Hola mundo",
	});
};

module.exports = { getUser, postUser, putUser, deleUser };

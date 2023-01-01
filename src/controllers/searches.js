const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require("../models");
// https://bobbyhadz.com/blog/javascript-error-cannot-set-headers-after-they-are-sent-to-client

const collections = ["users", "products", "categories", "role"];

const searchUser = async (term = "", res = response) => {
	try {
		const isMongoId = ObjectId.isValid(term);

		if (isMongoId) {
			const user = await User.findById(term);
			return res.json({
				msg: "Obteniendo un usuario",
				results: user ? [user] : [],
			});
		}

		const regex = new RegExp(term, "i");
		const users = await User.find({
			$or: [{ name: regex }, { email: regex }],
			$and: [{ isActive: true }],
		});
		res.json({
			msg: "Obteniendo los usuarios",
			users,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Contacta al adminstrador. No se realizo bien la busqueda en los usuarios",
		});
	}
};
const searchProducts = async (term = "", res = response) => {
	try {
		const isMongoId = ObjectId.isValid(term);

		if (isMongoId) {
			const product = await Product.findById(term).populate("category", "name");
			return res.json({
				msg: "Obteniendo el producto",
				results: product ? [product] : [],
			});
		}

		const regex = new RegExp(term, "i");
		const products = await Product.find({ name: regex, status: true }).populate(
			"category",
			"name"
		);
		res.json({
			msg: "Obteniendo los productos",
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Contacta al adminstrador. No se realizo bien la busqueda en los productos",
		});
	}
};
const searchCategories = async (term = "", res = response) => {
	try {
		const isMongoId = ObjectId.isValid(term);

		if (isMongoId) {
			const category = await Category.findById(term);
			return res.json({
				msg: "Obteniendo una categoria",
				results: category ? [category] : [],
			});
		}

		const regex = new RegExp(term, "i");
		const categories = await Category.find({
			name: regex,
			isActive: true,
		});
		res.json({
			msg: "Obteniendo las categorias",
			categories,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Contacta al adminstrador. No se realizo bien la busqueda en los usuarios",
		});
	}
};

const search = (req = request, res = response) => {
	const { collection, term } = req.params;

	try {
		if (!collections.includes(collection.toLowerCase())) {
			return res.status(404).json({
				msg: "Esa categoria no existe, contacta al administrador",
			});
		}

		switch (collection.toLowerCase()) {
			case "users":
				searchUser(term, res);
				break;
			case "products":
				searchProducts(term, res);
				break;
			case "categories":
				searchCategories(term, res);
				break;
			default:
				res.status(500).json({
					msg: "Olvido realizar esa busqueda",
				});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Contacta al administrador",
		});
	}
};

module.exports = {
	search,
};

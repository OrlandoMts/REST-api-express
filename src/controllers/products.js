const { request, response } = require("express");
const { Product } = require("../models");

const getProducts = async (req = request, res = response) => {
	const { limit = 5, from = 0 } = req.query;
	try {
		const [products, total] = await Promise.all([
			Product.find({ status: true })
				.populate("user", "name")
				.populate("category", "name")
				.skip(Number(from))
				.limit(Number(limit)),
			Product.countDocuments({ status: true }),
		]);

		res.json({
			msg: "Obteniendo los productos",
			products,
			total,
		});
	} catch (error) {
		console.log.log(error);
		res.status(400).json({
			msg: "Contacte al administrador",
		});
	}
};
const getProduct = async (req = request, res = response) => {
	const { id } = req.params;
	try {
		const product = await Product.findById(id)
			.populate("user", "name")
			.populate("category", "name");

		if (!product) {
			return res.status(404).json({
				msg: "No existe el producto",
			});
		}
		res.status(200).json({
			msg: "Obteniendo el producto",
			product,
		});
	} catch (error) {
		console.log.log(error);
		res.status(400).json({
			msg: "Contacte al administrador",
		});
	}
};
const newProduct = async (req = request, res = response) => {
	const { price, category, description, ...rest } = req.body;
	const name = req.body.name.toUpperCase();
	const userLogged = req.userLogged;
	try {
		const data = {
			name,
			user: userLogged._id,
			price,
			category,
			description,
		};
		const product = new Product(data);
		await product.save();
		res.status(201).json({
			msg: "Producto registrado",
			product,
		});
	} catch (error) {
		console.log.log(error);
		res.status(400).json({
			msg: "Contacte al administrador",
		});
	}
};
const updateProduct = async (req = request, res = response) => {
	// no actualizar si esta en status:false
	const { id } = req.params;
	const { status, user, category, ...data } = req.body;
	data.name = data.name.toUpperCase();
	data.user = req.userLogged._id;

	try {
		const product = await Product.findByIdAndUpdate(id, data, {
			new: true,
		})
			.populate("user", "name")
			.populate("category", "name");

		if (!product) {
			return res.status(400).json({
				msg: "El producto esta dado de baja",
			});
		}
		res.status(201).json({
			msg: "Producto actualizado",
			product,
		});
	} catch (error) {
		console.log.log(error);
		res.status(400).json({
			msg: "Contacte al administrador",
		});
	}
};
const deleteProduct = async (req = request, res = response) => {
	const { id } = req.params;

	try {
		const product = await Product.findByIdAndUpdate(
			id,
			{ status: false },
			{ new: true }
		);
		res.json({
			msg: "Producto dado de baja",
			product,
		});
	} catch (error) {
		console.log.log(error);
		res.status(400).json({
			msg: "Contacte al administrador",
		});
	}
};

module.exports = {
	getProducts,
	getProduct,
	newProduct,
	updateProduct,
	deleteProduct,
};

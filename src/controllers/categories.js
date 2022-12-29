const { request, response } = require("express");
const { Category } = require("../models");

// getCategories - paginado - total - "populate"
const getCategories = async (req = request, res = response) => {
	const { limit = 5, from = 0 } = req.query;
	try {
		const [categories, total] = await Promise.all([
			Category.find({ isActive: true })
				.populate("user", "name")
				.skip(Number(from))
				.limit(Number(limit)),
			Category.countDocuments({ isActive: true }),
		]);

		res.status(200).json({
			msg: "Obteniendo las categorias",
			categories,
			total,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({
			msg: "Contacta al administrador",
		});
	}
};

// getCategory - popoluate
const getCategory = async (req = request, res = response) => {
	const { id } = req.params;
	try {
		const category = await Category.findById(id).populate("user");
		if (!category) {
			return res.status(404).json({
				msg: "No existe esa categoria",
			});
		}
		res.status(200).json({
			msg: "Obteniendo una categoria",
			id,
			category,
		});
	} catch (error) {
		res.status(400).json({
			msg: "Ingresa un id correcto",
		});
	}
};

const newCategory = async (req = request, res = response) => {
	try {
		const name = req.body.name.toUpperCase();
		const userLogged = req.userLogged;

		const categoryDB = await Category.findOne({ name });
		if (categoryDB) {
			return res.status(400).json({
				msg: `Ya existe la categoria: ${categoryDB.name}`,
			});
		}
		const data = {
			name,
			user: userLogged._id, // Asi los graba mongo
		};
		const category = new Category(data);
		await category.save();

		res.status(201).json({
			msg: "Categoria creada",
			category,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			msg: "Ingresaste un dato mal",
		});
	}
};

// udpateCategory
const updateCategory = async (req = request, res = response) => {
	const { id } = req.params;
	const { isActive, user, ...data } = req.body;
	/**
	 * 1. El nombre a actulizar de la categoria
	 * 2. Quien la actualizo
	 */
	data.name = data.name.toUpperCase();
	data.user = req.userLogged._id;
	try {
		const category = await Category.findByIdAndUpdate(id, data, {
			new: true,
		}).populate("user", "name");
		res.status(201).json({
			msg: "Categoria actualizada",
			category,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			msg: "Contacta al administrador",
		});
	}
};

// deleteCategory - isActive: false
const deleteCategory = async (req = request, res = response) => {
	const { id } = req.params;
	try {
		const category = await Category.findByIdAndUpdate(
			id,
			{ isActive: false },
			{ new: true }
		);
		res.status(200).json({
			msg: "Categoria dada de baja",
			category,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Contacta al administrador",
		});
	}
};

module.exports = {
	getCategories,
	getCategory,
	newCategory,
	updateCategory,
	deleteCategory,
};

const route = require('express').Router();
const {  
    GetCategory,
    InsertCategory,
    UpdateCategory,
    DeleteCategory,
    GetCategoryById
} = require('../Controller/CategoryController');
const {
    GetProducts,
    CreateProduct,
    RemoveProduct,
    EditProduct,
    GetProductDetailsById,
} = require('../Controller/ProductController')

// Category Routes
route.post('/AddCategory', InsertCategory); // Add new category
route.put('/EditCategory/:id', UpdateCategory); // Edit a category
route.delete('/RemoveCategory/:id', DeleteCategory); // Delete a category
route.get('/GetCategory', GetCategory); // Get all categories
route.get('/GetCategoryById/:id', GetCategoryById); // Get a category by ID

// Product Routes
route.post('/AddProduct', CreateProduct); // Add new product
route.put('/EditProduct/:id', EditProduct); // Edit a product
route.delete('/RemoveProduct/:id', RemoveProduct); // Delete a product
route.get('/GetProducts', GetProducts); // Get all products
route.get('/GetProductById/:id', GetProductDetailsById); // Get a product by ID

module.exports = { route };

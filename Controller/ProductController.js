const {
    GetProductData,
    GetProductById,
    InsertProduct,
    UpdateProduct,
    DeleteProduct
} = require("../Service/ProductService");

const GetProducts = async (req, res) => {
    try {
        const { searchKeyword = '', sortOrder = 'ASC', page = 1, pageSize = 10 } = req.query;
        const products = await GetProductData(searchKeyword, sortOrder, page, pageSize);
        return res.json({ data: products });  // Send response with products data
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const GetProductDetailsById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await GetProductById(id);
        return res.json({ data: product });  // Send response with product details
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const CreateProduct = async (req, res) => {
    try {
        const { ProductName, CategoryId } = req.body;
        const result = await InsertProduct(ProductName, CategoryId);
        return res.json({ message: 'Product added successfully', result });  // Send success message
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const EditProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { ProductName, CategoryId } = req.body;
        const result = await UpdateProduct(id, ProductName, CategoryId);
        return res.json(result);  // Send success message
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const RemoveProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await DeleteProduct(id);
        if (result.error) {
            return res.status(404).json(result);  // Send error if product not found
        }
        return res.json(result);  // Send success message if deleted
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    GetProducts,
    GetProductDetailsById,
    CreateProduct,
    EditProduct,
    RemoveProduct
};

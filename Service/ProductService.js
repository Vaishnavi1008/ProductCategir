const DBConnection = require('../Config/DBConnection');

const GetProductData = async (searchKeyword = '', sortOrder = 'ASC', page = 1, pageSize = 10) => {
    try {
        const [products] = await DBConnection.query('CALL GetProducts(?, ?, ?, ?);', 
            [searchKeyword, sortOrder, parseInt(page), parseInt(pageSize)]
        );
        return products;  // Return the fetched products data
    } catch (error) {
        console.log(error);
        throw new Error('Internal Server Error');  // Throw error to be handled in the controller
    }
};

const GetProductById = async (id) => {
    try {
        const [product] = await DBConnection.query('CALL GetProductId(?);', [Number(id)]);
        return product;  // Return product data
    } catch (error) {
        console.log(error);
        throw new Error('Internal Server Error');
    }
};

const InsertProduct = async (productName, categoryId) => {
    try {
        const [result] = await DBConnection.query('CALL AddProduct(?, ?);', [productName, categoryId]);
        return result;  // Return the result of the insert operation
    } catch (error) {
        console.log(error);
        throw new Error('Internal Server Error');
    }
};

const UpdateProduct = async (id, productName, categoryId) => {
    try {
        await DBConnection.query('CALL UpdateProduct(?, ?, ?);', [id, productName, categoryId]);
        return { message: 'Product updated successfully' };  // Return success message
    } catch (error) {
        console.log(error);
        throw new Error('Internal Server Error');
    }
};

const DeleteProduct = async (id) => {
    try {
        const [productExists] = await DBConnection.query('SELECT * FROM Products WHERE ProductId = ?', [id]);
        if (productExists.length === 0) {
            return { error: 'Product not found' };  // Return error if product doesn't exist
        }
        await DBConnection.query('CALL DeleteProduct(?);', [id]);
        return { message: 'Product deleted successfully' };  // Return success message
    } catch (error) {
        console.log(error);
        throw new Error('Internal Server Error');
    }
};

module.exports = {
    GetProductData,
    GetProductById,
    InsertProduct,
    UpdateProduct,
    DeleteProduct
};

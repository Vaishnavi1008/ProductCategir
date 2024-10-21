const {
  GetCategoryData,
  GetCategoryDataById,
  AddCategoryData,
  UpdateCategoryData,
  DeleteCategoryData,
} = require("../Service/CategoryService");

const GetCategory = async (req, res) => {
    try {
      const categories = await GetCategoryData();  // Call service function
      return res.json(categories);  // Send response here
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const GetCategoryById = async (req, res) => {
    try {
      const { id } = req.params;
      const categoryById = await GetCategoryDataById(id);
      return res.json(categoryById);  // Send the category data as response
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const InsertCategory = async (req, res) => {
    try {
      const { CategoryName } = req.body;
      const result = await AddCategoryData(CategoryName);  // Call service to add category
      return res.json(result);  // Send response with success message
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const UpdateCategory = async (req, res) => {
    try {
      const { CategoryName } = req.body;
      const { id } = req.params;
      const result = await UpdateCategoryData(CategoryName, id);  // Call service to update category
      return res.json(result);  // Send response with success message
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const DeleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await DeleteCategoryData(id);  // Call service to delete category
      return res.json(result);  // Send response with success or error message
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
module.exports = {
  GetCategory,
  InsertCategory,
  UpdateCategory,
  DeleteCategory,
  GetCategoryById,
};

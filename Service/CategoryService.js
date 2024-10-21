const DBConnection = require('../Config/DBConnection');

const GetCategoryData = async () => {
    try {
      const [Category] = await DBConnection.query('CALL GetCategories();');
      console.log(Category);
      return Category;  // Return the data instead of res.json
    } catch (error) {
      console.log(error);
      throw new Error('Internal Server Error');  // Throw error, handle it in the controller
    }
  };
  
  const GetCategoryDataById = async (id) => {
    try {
      const [Category] = await DBConnection.query('CALL GetCategoryId(?);', [Number(id)]);
      console.log(Category);
      return Category;  // Return data
    } catch (error) {
      console.log(error);
      throw new Error('Internal Server Error');
    }
  };
  
  const AddCategoryData = async (CategoryName) => {
    try {
      const [result] = await DBConnection.query('CALL AddCategory(?);', [CategoryName]);
      return { message: 'Category added successfully', result };  // Return result
    } catch (error) {
      console.log(error);
      throw new Error('Internal Server Error');
    }
  };
  

  const UpdateCategoryData = async (CategoryName, CategoryId) => {
    try {
      await DBConnection.query('CALL UpdateCategory(?, ?);', [CategoryId, CategoryName]);
      return { message: 'Category updated successfully' };  // Return success message
    } catch (error) {
      console.log(error);
      throw new Error('Internal Server Error');
    }
  };
  

  const DeleteCategoryData = async (id) => {
    try {
      const [categoryExists] = await DBConnection.query('SELECT * FROM products WHERE CategoryId = ?', [id]);
      if (categoryExists.length === 0) {
        await DBConnection.query('CALL DeleteCategory(?);', [id]);
        return { message: 'Category deleted successfully' };  // Return success message
      }
      return { error: 'Cannot Delete Category' };  // Return error message if cannot delete
    } catch (error) {
      console.log(error);
      throw new Error('Internal Server Error');
    }
  };
module.exports= {
    GetCategoryData,
    AddCategoryData,
    UpdateCategoryData,
    DeleteCategoryData,
    GetCategoryDataById

}
const prod = {
  url: "",
};
const dev = {
  url: "http://localhost:5000",
};
export const { url } = dev
export const getCategory = url + "/api/GetCategory"
export const getCategorybyid = url + "/api/GetCategoryById"
export const InsertCategory = url + "/api/AddCategory"
export const updateCategory = url + "/api/EditCategory"
export const DeleteCategory= url+"/api/RemoveCategory"

export const getProducts = url + "/api/GetProducts"
export const InsertProducts = url + "/api/AddProducts"
export const getProductsbyid = url + "/api/GetProductId"
export const updateProducts = url + "/api/EditProducts"
export const DeleteById= url+"/api/RemoveProducts"




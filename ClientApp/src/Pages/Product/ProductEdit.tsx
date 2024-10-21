import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import {InsertProducts,getProductsbyid,updateProducts,getCategory} from "../../Helpers/APIEndPoints/EndPoints";
import InputForm from "../../Components/InputForm/InputForm";
import SelectForm from "../../Components/SelectForm/SelectForm";



const UserEdit = () => {
   
    const [CategoryOptions,setCategoryOptions] = useState(null)
    const [Category,setCategory] = useState(null)


  const { state } = useLocation();
  let navigate = useNavigate(); 
  const [formErrors, setFormErrors] = useState({});
  const [ProductName, setProductName] = useState("");
 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(getCategory);
        const formattedData = response.data.data[0].map(category => ({
          value: category.CategoryId, 
          label: category.CategoryName 
        }));
        setCategoryOptions(formattedData); 


                          } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);


  const handleChange = (e) => {
    setCategory(e);      
   console.log('Selected Category ID:', e); 
};
  const selectOnChange = (event, name) => {
    console.log(event);
    
    switch (name) {
      case "ProductName":
        setProductName(event.target.value);
        break;
      default:
        break;
    }
  };

  const Validation = () => {
    let isError = false;
    setFormErrors({});

    if (!ProductName) {
      setFormErrors(prev => ({ ...prev, ProductName: "Product Name is required" }));

      isError = true;
    }
   
    if (!Category) {
        setFormErrors(prev => ({ ...prev, Category: "Category  is required" }));

        isError = true;
      }

    return isError;
  };

  const getUserDetails = async () => {
    const url = `${getProductsbyid}/${state.id}`;
    const data = await axios.get(url);
    console.log(data,'hot')
    if (data) {
      setProductName(data.data.data[0][0].ProductName || "");
      setCategory({label:data.data.data[0][0].CategoryName , value:data.data.data[0][0].CategoryId})
      
    }
  };

  useEffect(() => {
    console.log(state,'stater')
    if (state && state.id) {
      getUserDetails();
    }
  }, [state]);

  const onClickFunction = async (event, name) => {
    if (name === "Cancel") {
      navigate("/Product");
    }
    if (name === "Submit") {
      const error = Validation();
      if (!error) {
        await InsertUpdateUsers();
      }
    }
    if (name === "Reset") {
      setProductName("");
      
      setFormErrors({});
    }
  };

  const InsertUpdateUsers = async () => {
    let requestParams = {
        ProductName:ProductName,
        CategoryId: Category ? Category.value :null
    };
    var data = null
    if(state){
      var url = `${updateProducts}/${state.id}`
      console.log(requestParams);
      
        data = await axios.put(url, requestParams);
    }
     else {
      
     data = await axios.post(InsertProducts, requestParams);
     }
     console.log(data)
    if (data.data.message) {
      console.log('a')
      navigate(-1);
    } else {
   
        // notify(1, "Something went wrong, Try again later.");
    }
  };

  return (
    <>


      <div className="col-lg-12 col-md-12 px-3 py-2 page_heading">
        <div className="row align-items-center">
          <div className="col-lg-4 col-sm-3 col-xs-4 ">
            <div className="form-group">
              <label className="col-form-label">Product Name</label>
              <sup>*</sup>
              <InputForm
              isDisabled={false}
                className="form-control form-control-lg input_form_height "
                placeholder={"Product Name"}
                value={ProductName}
                textArea={false}
                onChange={(e) => selectOnChange(e, 'ProductName')}
              />
              <p style={{ color: "red" }}>{formErrors["ProductName"]}</p>
            </div>
          </div>





          <div className="col-lg-4 col-sm-3 col-xs-4 ">
            <div className="form-group">
              <label className="col-form-label">Category</label>
              <sup>*</sup>
              <SelectForm
               options={CategoryOptions}
               value={Category}
               placeholder={"Category"}
               onChange={(e) => handleChange(e)}
              />
              <p style={{ color: "red" }}>{formErrors["Category"]}</p>
            </div>
          </div>
       

      



          <div className="col-lg-8 col-md-4">
            <div className="float-right">
              <button
                className="btn btn-success"
                style={{ marginLeft: 5 }}
                onClick={(e) => onClickFunction(e, "Submit")}
              >
                <i className="fa fa-save"></i> Submit
              </button>
              <button
                className="btn btn-info"
                style={{ marginLeft: 5 }}
                onClick={(e) => onClickFunction(e, "Reset")}
              >
                Reset
              </button>
              <button
                className="btn btn-cancel"
                style={{ marginLeft: 5 }}
                onClick={(e) => onClickFunction(e, "Cancel")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserEdit;

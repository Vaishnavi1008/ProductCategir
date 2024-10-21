import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//import { APICall } from "../../Helpers/APICalls";
import axios from 'axios';
import {InsertCategory,updateCategory,getCategorybyid} from "../../Helpers/APIEndPoints/EndPoints";
import InputForm from "../../Components/InputForm/InputForm";
import SelectForm from "../../Components/SelectForm/SelectForm";
const UserEdit = () => {
  const { state } = useLocation();
  let navigate = useNavigate(); 
  const [formErrors, setFormErrors] = useState({});
  const [categoryName, setCategoryName] = useState("");
 
  const selectOnChange = (event, name) => {
    switch (name) {
      case "categoryName":
        setCategoryName(event.target.value);
        break;
      default:
        break;
    }
  };

  const Validation = () => {
    let isError = false;
    setFormErrors({});

    if (!categoryName) {
      setFormErrors(prev => ({ ...prev, categoryName: "Category Name is required" }));
      isError = true;
    }
   

    return isError;
  };

  const getUserDetails = async () => {
    const url = `${getCategorybyid}/${state.id}`;
    const data = await axios.get(url);
    console.log(data,'hot')
    if (data) {
      setCategoryName(data.data.data[0][0].CategoryName || "");
      
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
      navigate("/Category");
    }
    if (name === "Submit") {
      const error = Validation();
      if (!error) {
        await InsertUpdateUsers();
      }else{
        alert('Category Name is Mandatory');
      }
    }
    if (name === "Reset") {
      setCategoryName("");
      
      setFormErrors({});
    }
  };

  const InsertUpdateUsers = async () => {
    console.log(state);
    
    let requestParams = {
      CategoryName:categoryName,
      
      
    };
    var data = null
    if(state){
      var url = `${updateCategory}/${state.id}`
        data = await axios.put(url, requestParams);
    }
     else {
      
     data = await axios.post(InsertCategory, requestParams);
     console.log(data)

     }
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
              <label className="col-form-label">Category Name</label>
              <sup>*</sup>
              <InputForm
              isDisabled={false}
                className="form-control form-control-lg input_form_height "
                placeholder={"Category Name"}
                value={categoryName}
                textArea={false}
                onChange={(e) => selectOnChange(e, 'categoryName')}
              />
              <p style={{ color: "red" }}>{formErrors["companyName"]}</p>
            </div>
          </div>



          <div className="col-lg-8 col-md-4">
            <div className="float-right">
              <button
                className="btn btn-success"
                style={{ marginLeft: 5 }}
                onClick={(e) =>{ console.log(e);
                 onClickFunction(e, "Submit")}}
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

import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import DynamicGrid from "../../Components/DynamicGrid/DynamicGrid";
import {getProducts,DeleteById} from "../../Helpers/APIEndPoints/EndPoints";


const UserDashboard = () => {
  let navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>([]);
  const [dashboardPageSize, setDashboardPageSize] = useState(10);
  const [dashboardStart, setDashboardStart] = useState(0);
  const [dashboardSortColumn, setDashboardSortColumn] = useState<any>("");
  const [dashboardSortDirection, setDashboardSortDirection] = useState("");
  const [dashboardCount, setDashboardCount] = useState(0);
  const [searchText, setSearchText] = useState<any>("");
  const [page, setPage] = useState(0);

  
  const DeleteProductById = async (id) => {
    const url = `${DeleteById}/${id}`;
    const data = await axios.delete(url);
    if (data.status === 200) {
      alert('Item deleted successfully');
        LoadDashboard();
  
    } else {
      alert('Failed to delete item');
    }
      
    }

  const gridColumns = [
    {
      name: "ProductId",
      label: "Id",
      options: {
        display: false,
      },
    },

    {
        name: "ProductName",
        label: "Product Name",
        options: {
          filter: false,
          sort: true,
          sortDescFirst: true,
        },
      },
    {
      name: "CategoryName",
      label: "Category Name",
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },  
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        display: true,
        setCellProps: () => ({
          style: { textAlign: "center" },
        }),
        setCellHeaderProps: () => ({
          style: { textAlign: "center" },
        }),
        customBodyRender: (value, tableMeta) => {
          let id = tableMeta.tableData[tableMeta.rowIndex]['ProductId'];
          console.log(id)
          return (
            <div className="d-flex justify-content-center">
              <Tooltip title="edit">
                <a
                  className="mr-2"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/ProductEdit", {
                      state: { id },
                    });
                  }}>
                  <i className="fas fa-edit"></i>
                </a>
              </Tooltip>
            </div>
          );
        },
      },
    },
    {
        name: "delete",
        label: "Delete",
        options: {
          filter: false,
          sort: false,
          display: true,
          setCellProps: () => ({
            style: { textAlign: "center" },
          }),
          setCellHeaderProps: () => ({
            style: { textAlign: "center" },
          }),
          customBodyRender: (value, tableMeta) => {
            let id = tableMeta.tableData[tableMeta.rowIndex]['ProductId'];
            console.log(id);
            
            return (
              <div className="d-flex justify-content-center">
                <Tooltip title="Delete">
                  <a
                    className="mr-2"
                    onClick={(e) => {
                      e.preventDefault();
                      DeleteProductById(id)
                    }}>
                    <i className="fas fa-trash"></i>
                  </a>
                </Tooltip>
              </div>
            );
          },
        },
      }
  ];

  useEffect(() => {
    (async () => {

    })();
  }, []);




  const LoadDashboard = async () => {
    await setDashboardData([]);
    await setDashboardCount(0);

    let requestParams = {
      pageSize: dashboardPageSize,
      pageStart: dashboardStart,
      SortOrder: dashboardSortDirection,
      SortColumn: dashboardSortColumn,
      SearchText: searchText,
    };
    const  data  = await axios.get(getProducts);
    console.log(data,'data')
    
    if (data !== null && data != undefined ) {
      await setDashboardData(data.data.data[0]);
      setDashboardCount(data.data.data[0].length);
    }
  };
  useEffect(() => {
    if (searchText.length !== 0) {
      setSearchText(searchText);
      setDashboardStart(0);
      setPage(0);
    } else {
      setDashboardStart(0);
      setPage(0);
    }
  }, [searchText]);

  useEffect(() => {
    LoadDashboard();
  }, [
    dashboardStart,
    dashboardSortColumn,
    dashboardSortDirection,
    dashboardCount,
    searchText,
  ]);


  const dashboardOptions = {
    showEmptyDataSourceMessage: true,
    selectableRows: "none",
    count: dashboardCount,
    rowsPerPage: dashboardPageSize,
    page: page,
    serverSide: true,
    rowsPerPageOptions: [],
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    search: false,
    responsive: "standard",

    onChangeRowsPerPage: (num) => {
    
    },
    onSearchChange: (searchText) => {
      if (searchText !== null) {
        setSearchText(searchText);
      } else {
        setSearchText("");
      }
    },
    onColumnSortChange: async (sortColumn, sortDirection) => {
      if (sortDirection === "asc") {
        await setDashboardSortColumn(sortColumn);
        await setDashboardSortDirection(sortDirection);
      }
      if (sortDirection === "desc") {
        await setDashboardSortColumn(sortColumn);
        await setDashboardSortDirection(sortDirection);
      }
    },
    onChangePage: async (page) => {
      await setPage(page);
      await setDashboardStart(page * dashboardPageSize);
    },
    textLabels: {
      body: {
        noMatch: "No data found",
      },
    },
  };
 const add = () => {
 navigate('/ProductEdit')
 }
  return (
    <>
      {true ? (
        <>
          <div className="page-content row filter-row-container m-0">
            <div className="transformer-tabs col-lg-12 col-md-12">
              <div className="meeting-tabs tabs-main col-lg-12 pl-0">
                <ul className="filters">
                  <li className="row d-flex mr-3">
                <div className="ml-3">
                  <button className="btn btn-save" onClick={add}>Add</button>
                
                </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <DynamicGrid
              options={dashboardOptions}
              data={dashboardData}
              columns={gridColumns}
            />
          </div>
        </>
       ) : ""
      }
    </>
  );
};
export default UserDashboard;

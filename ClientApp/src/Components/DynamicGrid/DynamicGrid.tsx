import React from "react";
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import "./DynamicGrid.css"
declare module "@mui/material/styles" {
  interface Components {
    [key: string]: any;
  }
}

const DynamicGrid = (props: any, ...rest: any) => {
  const muiCache = createCache({
    key: "mui",
    prepend: true,
  });

  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableToolbar: {
          styleOverrides: {
            root: {
              backgroundColor: "#3c3c3c",
              color: "white",
            },
            icon: {
              color: "white",
              "&:hover": {
                color: "white",
              },
            },
            iconActive: {
              color: "white",
            },
          },
        },
        MUIDataTableSearch: {
          styleOverrides: {
            searchIcon: {
              color: "white",
            },
            searchText: {
              "& input": {
                color: "white",
              },
            },
            clearIcon: {
              color: "white",
            },
          },
        },
        MUIDataTableHeadCell: {
          styleOverrides: {
            root: {
              backgroundColor: "#3c3c3c",
              color: "white",
            },
            sortActive: {
              color: "white",
            },
          },
        },
        MUIDataTableSelectCell: {
          styleOverrides: {
            headerCell: {
              backgroundColor: "#3c3c3c",
              color: "white",
            },
            sortActive: {
              color: "white",
            },
          },
        },
        MuiButtonBase: {
          styleOverrides: {
            root: {
              "& .MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon": {
                color: "white",
              },
            },
          },
        },
        MUIDataTableBodyRow: {
          styleOverrides: {
            root: {
              ":nth-of-type(odd)": {
                backgroundColor: "#ececec",
              },
            },
          },
        },
      },
    });

  return (
    <div className="px-3 box-shdw">
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable className="text-align-center"
            title={props.title}
            data={props.data}
            columns={props.columns}
            options={props.options}
            components={props.components}
          />
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
};

export default DynamicGrid;

import React, { Fragment, useEffect } from "react";
// import { DataGrid } from '@mui/x-data-grid';
// import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import MetaData from "../layout/MetaData";
import LaunchIcon from '@mui/icons-material/Launch';
import { useParams } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();
  // const {id} = useParams();
  // const {params} = useParams();
  
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const  GridRowsProp = [];
    orders &&
    orders.forEach((item, index) => {
        GridRowsProp.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  
  const  GridColDef = [
    { field: "id",
    headerName: "Order ID",
    minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
        // orders.orderStatus=== "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },

  ];
  
//   const columns = [
//     { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

//     {
//       field: "status",
//       headerName: "Status",
//       minWidth: 150,
//       flex: 0.5,
//       cellClassName: (params) => {
//         return params.getValue(params.id, "status") === "Delivered"
//           ? "greenColor"
//           : "redColor";
//       },
//     },
//     {
//       field: "itemsQty",
//       headerName: "Items Qty",
//       type: "number",
//       minWidth: 150,
//       flex: 0.3,
//     },

//     {
//       field: "amount",
//       headerName: "Amount",
//       type: "number",
//       minWidth: 270,
//       flex: 0.5,
//     },

//     {
//       field: "actions",
//       flex: 0.3,
//       headerName: "Actions",
//       minWidth: 150,
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <Link to={`/order/${params.getValue(params.id, "id")}`}>
//             <LaunchIcon />
//           </Link>
//         );
//       },
//     },
//   ];
//   const rows = [];

//   orders &&
//     orders.forEach((item, index) => {
//       rows.push({
//         itemsQty: item.orderItems.length,
//         id: item._id,
//         status: item.orderStatus,
//         amount: item.totalPrice,
//       });
//     });

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
          <div className="myOrdersPage">
            <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
             {/* <DataGrid rows={GridRowsProp} columns={GridColDef} /> */}
          <DataGrid 
            rows={GridRowsProp}
            columns={GridColDef}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
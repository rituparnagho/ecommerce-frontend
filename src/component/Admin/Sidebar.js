import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
// import TreeView from '@mui/lab/TreeView';
// import TreeItem from '@mui/lab/TreeItem';
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
// import ImportExportIcon from "@mui/icons-material/ImportExport";
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      {/* <Link> */}
        {/* <TreeView
         defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
          // defaultCollapseIcon={<ExpandMoreIcon />}
          // defaultExpandIcon={<ImportExportIcon />}
        > */}
           
            <Link to="/admin/products">
               <p><PostAddIcon /> All Products</p>
              {/* <p label="All"  /> */}
            </Link>

            <Link to="/admin/product">
              <p><AddIcon /> Create Product</p>
            </Link>
            
          {/* </TreeItem> */}
        {/* </TreeView> */}
      {/* </Link> */}
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
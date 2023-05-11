import React, { useEffect,useState } from 'react';
import "../Products/Products.css";
import {useSelector, useDispatch} from 'react-redux';
import { getProduct } from '../../actions/productAction';
import Loader from '../../component/layout/Loader/Loader';
import Product from '../../component/Product/Product';
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Slider from '@mui/material/Slider';
import MetaData from '../../component/layout/MetaData'



const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 50000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const dispatch = useDispatch();
  const { loading, products, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );
  const { keyword } = useParams();
  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price,category,ratings));
  }, [dispatch, keyword, currentPage, price,category,ratings]);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <MetaData title="PRODUCTS--ECOMMERCE"/>
            <h2 className="productsHeading">Products</h2>
            <div className="products">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>

            {/* { keyword &&  */}
            <div className="filterBox">
              <Typography variant="subtitle1" gutterBottom>
                Price
              </Typography>
              <Slider
               value={price}
               onChange={priceHandler}
               valueLabelDisplay="auto"
               aria-labelledby="range-slider"
               min={0}
               max={50000}
              />


            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>

            </div>

      {/* } */}


            {resultPerPage < productCount && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                  pageRangeDisplayed={2}
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default Products;
import React from 'react';
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import '../Product/product.css';
import {FaRupeeSign} from 'react-icons/fa'
const Product = ({product}) => {
   const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true
   }
  return (
    <>
    <Link className="productCard" to={`/product/${product._id}`}>
    <img height='auto' width='auto' alt={product.name} src={product.images[0].url} />
    <p>{product.name}</p>
    <div>
      <ReactStars {...options}  />
      <span className="productCardSpan">({product.numofReviews}) Reviews</span>
    </div>
    <h3><FaRupeeSign/>{`${product.price}`}</h3>
    </Link>
   </>
  )
}
export default Product;
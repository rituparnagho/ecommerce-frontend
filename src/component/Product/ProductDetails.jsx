import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router-dom'
import './product.css';
import {useSelector, useDispatch} from  'react-redux';
import { getProductDetails, newReview , clearErrors} from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import { FaRupeeSign } from "react-icons/fa";
import ReviewCard from "./ReviewCard.js";
import Loader from '../../component/layout/Loader/Loader';
import {addItemsToCart} from '../../actions/cartAction'
import Rating from '@mui/material/Rating';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';

import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
const ProductDetails = () => {
    const dispatch = useDispatch();
    const {product,loading, error} = useSelector((state) => state.productDetails)

    const {success, error: reviewError} = useSelector(
      (state) => state.newReview
    )

    const  {id}  = useParams();
    
    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
       }

       const [quantity, setQuantity] = useState(1);
       const [open, setOpen] = useState(false);
       const [rating, setRating] = useState(0);
       const [comment, setComment] = useState("");

       const increaseQuantity = () => {
        if (product.stock <= quantity) return;
    
        const qty = quantity + 1;
        setQuantity(qty);
      };
    
      const decreaseQuantity = () => {
        if (1 >= quantity) return;
    
        const qty = quantity - 1;
        setQuantity(qty);
      };

      const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert("Item Added To Cart");
      };

      const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
      };

      const reviewSubmitHandler = () => {
        const myForm = new FormData();
    
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);
    
        dispatch(newReview(myForm));
    
        setOpen(false);
      };

    //   useEffect(()=> {
    //     dispatch(getProductDetails(id))
    // },[dispatch, id]);
      useEffect(() => {
        if (error) {
          alert(error);
          dispatch(clearErrors());
        }
    
        if (reviewError) {
          alert(reviewError);
          dispatch(clearErrors());
        }
    
        if (success) {
          alert("Review Submitted Successfully");
          dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(id));
      }, [dispatch, id, alert, reviewError, success]);

  return (
        <>
          {loading ? (<Loader/>) : ( 
            <>
<div className="ProductDetails">
    <div>
        <Carousel>
            {product.images &&
              product.images.map((item, i) => {
                return(
                <img
                className='CarouselImage'
                 src={item.url}
                 key={item.url}
                 alt={`${i} Slide`}
                />
                )
              })}
        </Carousel>
    </div>
    <div className="">
    <div className="detailsBlog-1">
        <h2>{product.name}</h2>
        <p>Product # {product._id}</p>
    </div>
    <div className="detailsBlock-2">
        <ReactStars {...options} />
        <span className='detailsBlock-2-span'>{product.numofReviews} Reviews </span>
    </div>
    <div className="detailsBlock-3">
      <h3><FaRupeeSign /> {`${product.price}`}</h3>
      <div className="detailsBlock-3-1">
        <div className="detailsBlock-3-1-1">
          <button onClick={decreaseQuantity}>-</button>
             <input readOnly type="number" value={quantity}/>
           <button onClick={increaseQuantity}>+</button>
        </div>
        <button disabled= {product.stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
      </div>
      <p>
              Status:
              <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                {product.stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
    </div>
    <div className="detailsBlock-4">
        Description: <p>{product.description}</p>
    </div>
    <button 
     onClick={submitReviewToggle}
    className='submitReview'>Submit Review</button>
    </div>
</div>

<Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
 <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

<h3 className="reviewsHeading">REVIEWS</h3>
{product.reviews && product.reviews[0] ? (
<div className="reviews">
{product.reviews &&
            product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
  </div>
  ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}
</>

          )}
        </>
  )
}
export default ProductDetails



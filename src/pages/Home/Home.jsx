import React , {useEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Product from '../../component/Product/Product';
import MetaData from "../../component/layout/MetaData"
import { getProduct } from '../../actions/productAction';
import { useSelector,useDispatch } from "react-redux";
import Loader from '../../component/layout/Loader/Loader';
// import {useAlert} from "react-alert"

const Home = () => {
  // const alert = useAlert()
  const dispatch = useDispatch()
  const { loading, error, products} = useSelector(
    (state) => state.products
  )

  useEffect(() => {
    if(error) {
      return alert(error);
    }
    dispatch(getProduct())
  }, [dispatch, error])

   const images = [
       {
        img: "https://m.media-amazon.com/images/I/61O72XhcEkL._SX3000_.jpg"
       },
       {
        img: "https://m.media-amazon.com/images/I/71eQVahI6GL._SX3000_.jpg"
       },
       {
        img: "https://m.media-amazon.com/images/I/61tk4B-Bx+L._SX3000_.jpg"
       },
       {
        img: "https://m.media-amazon.com/images/I/61nhlTOivrL._SX3000_.jpg"
       },
   ]
  //  const product =
  //   {
  //     name: "Redmi",
  //     image: [{url: "https://rukminim1.flixcart.com/image/416/416/l0o6nbk0/mobile/y/s/e/-original-imagceu559m75mks.jpeg"}],
  //     price: 25000,
  //     _id: "abhishek"
  //   }
  return (
    <>
    {loading ? (<Loader/>) : ( 
      <>
      <MetaData title="ECOMMERCE"/>
      <div>
      <Carousel
      autoPlay
      infiniteLoop
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      interval={2000}
     >
     { images.map((elm) => {
       return (
          <img src={elm.img} alt="1" />
       )
     })}
    </Carousel>
    </div>
    <div className='container' id="container">
      {products && products.map((product) => <Product product = {product}/>)}
    </div>
    
      </>)}
      </>
   
  )
}
export default Home
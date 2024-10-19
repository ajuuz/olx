import React, { useEffect } from 'react';
import './Product.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useContext,useState } from 'react';
import { ProductContext } from '../../ProductContext';
import { useNavigate } from 'react-router-dom';

const Product = () => {

    const [thumbs,setThumbs] = useState(false)
    const {ProductDetails,setProductDetails} = useContext(ProductContext)
    const navigate = useNavigate()
  const product = {
    name: ProductDetails.name,
    price: ProductDetails.price,
    condition: ProductDetails.name,
    location: ProductDetails.location,
    datePosted: ProductDetails.datePosted,
    seller: {
      name: ProductDetails.sellerName,
      image: ProductDetails.sellerImage , // Replace with actual seller image
    },
    productImage: ProductDetails.productImage, // Replace with actual product image
    description: ProductDetails.description,
    postedLocation: ProductDetails.postedLocation,
    disclaimer: `
      Before purchasing a product, we highly recommend that you verify all details 
      with the seller, including the condition, authenticity, and price. Please inspect 
      the item thoroughly, as all transactions are final and made directly between you 
      and the seller. We do not offer any warranties, guarantees, or returns on the 
      products listed. Make sure to communicate clearly with the seller and confirm all 
      information before proceeding with the purchase.
    `
  };

useEffect(()=>{
console.log(ProductDetails)
console.log(product.seller.image)
},[])

  return (
    <>
    <Header></Header>
    
    <div className="my-10 product-page-container">
      {/* Product Section */}
      <div className="product-section">
        <div className="product-image-container">
          <img className="product-image" src={product.productImage} alt={product.name} />
        </div>
        <div className="product-details">
          <h2>Details</h2>
          <p>{product.description}</p>
        </div>
      </div>

      {/* Sidebar Section */}
      <div className="sidebar">
        
      <i onClick={()=>navigate(-1)} class="fa-solid fa-xmark ms-[90%] text-2xl rounded-lg border-blue-400 px-3 border"></i>
        {/* Price Section */}
        <div className="price-section">
          <h2>PRICE: ${product.price}</h2>
          <p id="product-name">PRODUCT: {product.condition}</p>
          <p className="location">{product.location}</p>
          <p className="date-posted">{product.datePosted}</p>
        </div>

        {/* Seller Section */}
        <div className="seller-section">
          <img className="seller-image m-auto" src={product.seller.image||'https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png'} alt={product.seller.name} />
          <p className="seller-name">Seller: {product.seller.name}</p>
          <button onClick={()=>setThumbs(!thumbs)} className="request-button">{thumbs?"Product Requested":"Request for Product" }<i className={`${thumbs?'thumbsUp':"text-black"} fa-solid ms-2  fa-thumbs-up`}></i></button>
        </div>

        {/* Posted Location */}
        <div className="posted-section">
          <h3>Posted in</h3>
          <p>{product.postedLocation}</p>
        </div>

        {/* Disclaimer */}
        <div className="disclaimer">
          <h3>Posted in</h3>
          <p>{product.disclaimer}</p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Product;

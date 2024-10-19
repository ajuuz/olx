import React, { useState, useEffect, useContext } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import "./CardSection.css";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../ProductContext";
import { searchContext } from "../../SearchContext";

const CardSection = () => {
  // useSate
  const [products, setProducts] = useState([]);
  const [categ, setCateg] = useState(null);

  //   navigation
  const navigate = useNavigate();

  // context
  const { ProductDetails, setProductDetails } = useContext(ProductContext);
  const { filter, setFilter } = useContext(searchContext);

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      if ("subcategory" in filter) {
        if (filter.subcategory === null) {
          var q = query(
            collection(db, "products"),
            where("subcategory", "!=", filter.subcategory)
          );
        } else {
          var q = query(
            collection(db, "products"),
            where("subcategory", "==", filter.subcategory)
          );
        }

        const querySnapshot = await getDocs(q);
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(productList)
        setProducts(productList); // Store products in state
      } 
      else if ("substring" in filter) 
        {
            console.log("working")
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filteredProducts = productList.filter((product) => 
            product.productName.toLowerCase().includes(filter.substring.toLowerCase())
          );

          setProducts(filteredProducts)
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
    console.log(filter);
  }, [filter]);

  function handleProductClick(product) {
    console.log(product)
    setProductDetails({
      name: product.productName,
      price: product.price,
      location: product.location,
      datePosted: product.createdAt,
      sellerName: product.userName,
      sellerImage: product.sellerImg, // Replace with actual seller image,
      productImage: product.imageUrl, // Replace with actual product image
      description: product.description,
      postedLocation: product.location,
    });
    navigate("/product");
  }

  return (
    <div className="p-5">
      <ul className="flex overflow-auto mb-10 gap-5 font-serif text-gray-600">
        <li
          onClick={() => setFilter({ subcategory: null })}
          className="hover:text-gray-950 text-nowrap cursor-pointer"
        >
          ALL CATEGORIES
        </li>
        <li
          onClick={() => setFilter({ subcategory: "Cars" })}
          className="hover:text-gray-950 cursor-pointer"
        >
          Cars
        </li>
        <li
          onClick={() => setFilter({ subcategory: "Properties" })}
          className="hover:text-gray-950 cursor-pointer"
        >
          Properties
        </li>
        <li
          onClick={() => setFilter({ subcategory: "Mobile" })}
          className="hover:text-gray-950 cursor-pointer"
        >
          Mobiles
        </li>
        <li
          onClick={() => setFilter({ subcategory: "Bikes" })}
          className="hover:text-gray-950 cursor-pointer"
        >
          Bikes
        </li>
        <li
          onClick={() => setFilter({ subcategory: "Jobs" })}
          className="hover:text-gray-950 cursor-pointer"
        >
          Jobs
        </li>
        <li
          onClick={() => setFilter({ subcategory: "Fashions" })}
          className="hover:text-gray-950 cursor-pointer"
        >
          Fashions
        </li>
        <li
          onClick={() => setFilter({ subcategory: "Pets" })}
          className="hover:text-gray-950 cursor-pointer"
        >
          Pets
        </li>
        <li
          onClick={() => setFilter({ subcategory: "Accessories" })}
          className="hover:text-gray-950 cursor-pointer"
        >
          Accessories
        </li>
        <li
          onClick={() => setFilter({ subcategory: "Laptop/pc" })}
          className="hover:text-gray-950 cursor-pointer"
        >
          Laptop/pc
        </li>
        <li
          onClick={() => setFilter({ subcategory: "Services" })}
          className="hover:text-gray-950 cursor-pointer"
        >
          Services
        </li>
        <li
          onClick={() => setFilter({ subcategory: "Sports" })}
          className="hover:text-gray-950 cursor-pointer"
        >
          Sports
        </li>
        <li
          onClick={() => setFilter({ subcategory: "Others" })}
          className="hover:text-gray-950 cursor-pointer"
        >
          Others
        </li>
      </ul>
      <h1 className="text-2xl font-semibold text-center">
        Fresh recommendations
      </h1>
      <div className="card-container ">
        {products.map((product) => (
          <div onClick={() => handleProductClick(product)} class="card">
            <img
              src={product.imageUrl}
              className=""
              alt={product.productName}
            />
            <div class="card-content">
              <h3 class="card-title font-bold">{product.productName}</h3>
              <p class="card-price">$ {product.price}</p>
              <p class="card-description">
                {product.description.slice(0, 60)}..
              </p>
              <span className="card-description">
                <i class="fa-solid fa-location-dot me-3"></i>
                {product.location}
              </span>
              <span>{product.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSection;

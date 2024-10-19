// importing Home page
import Home from "./Pages/Home/Home";
import Product from "./Pages/Product/Product";
import SellPage from "./Pages/SellPage/SellPage";
import { UserProvider } from "./UserProvider";
import { ProductDetails } from "./ProductContext";
import { Search } from "./SearchContext";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <UserProvider>
        <ProductDetails>
         <Search>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sellpage" element={<SellPage />} />
            <Route path='product' element={<Product/>}></Route>
          </Routes>
        </Router>
        </Search>
        </ProductDetails>
      </UserProvider>
    </div>
  );
};

export default App;

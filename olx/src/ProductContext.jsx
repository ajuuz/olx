import { createContext, useContext,useState } from "react";

export const ProductContext = createContext(null)
export function ProductDetails({children}){
const [ProductDetails,setProductDetails]=useState()

    return(
        <ProductContext.Provider value={{ProductDetails,setProductDetails}}>
            {children}
        </ProductContext.Provider>
    )
}
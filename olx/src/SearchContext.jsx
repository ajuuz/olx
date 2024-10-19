import { createContext,useContext, useState } from "react";

export const searchContext = createContext();

export function Search({children}){
    const [filter,setFilter]= useState({subcategory:null});

    return(
        <searchContext.Provider value={{filter,setFilter}}>
            {children}
        </searchContext.Provider>
    )
}
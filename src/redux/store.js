import { configureStore } from "@reduxjs/toolkit";
import { itemsApi } from "./services/itemsApi";
import paginationSlice from "./slice/paginationSlice";

export const store = configureStore({
    reducer: {
       [itemsApi.reducerPath]: itemsApi.reducer,
        pagination : paginationSlice,
    },
    
    middleware : (getDefaulMiddleware) => 
         getDefaulMiddleware().concat(itemsApi.middleware)
});
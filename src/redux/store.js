import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { itemsApi } from "./services/itemsApi";
import paginationSlice from "./slice/paginationSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    pagination : paginationSlice,
  },
  
  middleware : (getDefaulMiddleware) => 
    getDefaulMiddleware().concat(authApi.middleware, itemsApi.middleware)
});

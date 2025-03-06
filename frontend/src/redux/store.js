import { configureStore } from "@reduxjs/toolkit";
import cartReduser from "./features/cart/cartSlice";
import authApi from "./features/auth/authApi";
import  authReduser  from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReduser,
    [authApi.reducerPath]: authApi.reducer,
    auth:authReduser
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

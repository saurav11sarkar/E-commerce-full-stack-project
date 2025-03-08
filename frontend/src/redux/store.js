import { configureStore } from "@reduxjs/toolkit";
import cartReduser from "./features/cart/cartSlice";
import authApi from "./features/auth/authApi";
import authReduser from "./features/auth/authSlice";
import productApi from "./features/products/productApi";
import reviewApi from "./features/reviews/reviewsApi";

export const store = configureStore({
  reducer: {
    cart: cartReduser,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReduser,
    [productApi.reducerPath]: productApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      reviewApi.middleware
    ),
});

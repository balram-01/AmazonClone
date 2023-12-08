import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./src/redux/CartReducer";


export default store = configureStore({
    reducer: {
        cart: CartReducer,
    }
})
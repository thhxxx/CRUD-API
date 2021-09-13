import {configureStore} from '@reduxjs/toolkit'
import ProductReducer from "./reducers/ProductReducer";
import CartReducer from "./reducers/CartReducer";

export const store = configureStore({
    reducer: {
        ProductReducer,
        CartReducer
    },
})
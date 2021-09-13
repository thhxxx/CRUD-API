import {createSlice} from "@reduxjs/toolkit";

const CartReducer = createSlice({
    name: "CartReducer",
    initialState: {
        productList: JSON.parse(localStorage.getItem("product-list")) || []
    },
    reducers: {
        addToCart: (state, action) => {
            const {product} = action.payload

            let indexOfExistedProduct = null;

            for (let i = 0; i < state.productList.length; i++) {
                if (state.productList[i].id === product.id && state.productList[i].size === product.size) {
                    indexOfExistedProduct = i;
                    break;
                }
            }

            if (indexOfExistedProduct === null) {
                product.quantityCart = 1
                state.productList.unshift(product)
            } else {
                state.productList[indexOfExistedProduct].quantityCart += 1;
            }

            localStorage.setItem("product-list", JSON.stringify(state.productList));
        }
    }
})

export const {addToCart} = CartReducer.actions
export default CartReducer.reducer
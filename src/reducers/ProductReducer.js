import {createSlice} from "@reduxjs/toolkit";

const ProductReducer = createSlice({
    name: "ProductReducer",
    initialState: {
        product: undefined
    },
    reducers: {
        editProduct: (state, action) => {
            const {value} = action.payload
            state.product = value
        },
        resetProduct: state => {
            state.product = undefined
        }
    }
})

export const {editProduct, resetProduct} = ProductReducer.actions
export default ProductReducer.reducer
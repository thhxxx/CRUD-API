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
        }
    }
})

export const {editProduct} = ProductReducer.actions
export default ProductReducer.reducer
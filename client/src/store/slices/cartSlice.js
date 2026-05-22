import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id && x.size === item.size);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id && x.size === existItem.size ? { ...x, qty: x.qty + item.qty } : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        updateQuantity: (state, action) => {
            const { _id, size, qty } = action.payload;
            state.cartItems = state.cartItems.map((x) =>
                x._id === _id && x.size === size ? { ...x, qty } : x
            );
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            const { _id, size } = action.payload;
            state.cartItems = state.cartItems.filter((x) => !(x._id === _id && x.size === size));
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem('cartItems');
        },
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

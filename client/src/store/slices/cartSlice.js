import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register } from './authSlice';

const getStoredUser = () => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
};

const getUserId = (user) => user?._id || user?.id || null;

const getCartStorageKey = (userId) => (userId ? `cartItems:${userId}` : 'cartItems');

const getStoredCart = (userId) => {
    const storedCart = localStorage.getItem(getCartStorageKey(userId));
    return storedCart ? JSON.parse(storedCart) : [];
};

const saveCart = (userId, cartItems) => {
    const storageKey = getCartStorageKey(userId);

    if (cartItems.length === 0) {
        localStorage.removeItem(storageKey);
        return;
    }

    localStorage.setItem(storageKey, JSON.stringify(cartItems));
};

const initialUserId = getUserId(getStoredUser());

const initialState = {
    cartItems: getStoredCart(initialUserId),
    cartOwnerId: initialUserId,
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
                state.cartItems = state.cartItems.map((x) => {
                    if (x._id === existItem._id && x.size === existItem.size) {
                        const newQty = x.qty + item.qty;
                        return { ...x, qty: newQty > item.countInStock ? item.countInStock : newQty, isSelected: true };
                    }
                    return x;
                });
            } else {
                const initialQty = item.qty > item.countInStock ? item.countInStock : item.qty;
                state.cartItems = [...state.cartItems, { ...item, qty: initialQty, isSelected: true }];
            }
            saveCart(state.cartOwnerId, state.cartItems);
        },
        updateQuantity: (state, action) => {
            const { _id, size, qty } = action.payload;
            state.cartItems = state.cartItems.map((x) =>
                x._id === _id && x.size === size ? { ...x, qty } : x
            );
            saveCart(state.cartOwnerId, state.cartItems);
        },
        removeFromCart: (state, action) => {
            const { _id, size } = action.payload;
            state.cartItems = state.cartItems.filter((x) => !(x._id === _id && x.size === size));
            saveCart(state.cartOwnerId, state.cartItems);
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem(getCartStorageKey(state.cartOwnerId));
        },
        toggleItemSelection: (state, action) => {
            const { _id, size } = action.payload;
            state.cartItems = state.cartItems.map((x) =>
                x._id === _id && x.size === size ? { ...x, isSelected: !x.isSelected } : x
            );
            saveCart(state.cartOwnerId, state.cartItems);
        },
        toggleAllSelection: (state, action) => {
            const isSelected = action.payload;
            state.cartItems = state.cartItems.map((x) => ({ ...x, isSelected }));
            saveCart(state.cartOwnerId, state.cartItems);
        },
        clearSelectedItems: (state) => {
            state.cartItems = state.cartItems.filter((x) => !x.isSelected);
            saveCart(state.cartOwnerId, state.cartItems);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                const userId = getUserId(action.payload);
                state.cartOwnerId = userId;
                state.cartItems = getStoredCart(userId);
            })
            .addCase(register.fulfilled, (state, action) => {
                const userId = getUserId(action.payload);
                state.cartOwnerId = userId;
                state.cartItems = getStoredCart(userId);
            })
            .addCase(logout, (state) => {
                state.cartOwnerId = null;
                state.cartItems = [];
                localStorage.removeItem('cartItems');
            });
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart, toggleItemSelection, toggleAllSelection, clearSelectedItems } = cartSlice.actions;
export default cartSlice.reducer;

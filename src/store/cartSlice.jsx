import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

const initialState = {
    cartItem: [],
    totalItems: 0,
    changed: false
}

export const sendCartData = createAsyncThunk('cart/sendCartData', 
    async (cart, {rejectWithValue, dispatch})=>{
        dispatch(
            uiActions.showNotification({
                status:"pending",
                title: "Sending",
                message: "Sending Cart Data!",
            })
        );
        try{
            const res = await fetch(`https://ecommerce-site-9c080-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json`, {
                method: 'PUT',
                body:JSON.stringify(cart),
            });
            
            if(!res.ok){
                throw new Error("Sending cart data failed.");
            }
            dispatch(
                uiActions.showNotification({
                    status:"success",
                    title: "Success",
                    message: "Sent cart data SuccessFully!",
                })
            );
        }catch(err){
            dispatch(
                uiActions.showNotification({
                    status:"error",
                    title: "Error!",
                    message: err.message || "Sending Cart Data Failed!",
                })
            );
            return rejectWithValue(err.message);
        }
    }
);

export const fetchCartData = createAsyncThunk('cart/fetchCartData',
    async (_, {rejectWithValue, dispatch})=>{
        dispatch(
            uiActions.showNotification({
                status:"pending",
                title: "Fetching...",
                message: "Fetching Cart Data!",
            })
        );
        try{
            const response = await fetch(
                `https://ecommerce-site-9c080-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json`
            );

            if (!response.ok) {
                throw new Error('Could not fetch cart data!');
            }

            const data = await response.json();
            dispatch(
                uiActions.showNotification({
                    status:"success",
                    title: "Success!",
                    message: "Fetched cart data successfully!",
                })
            );
            return data || { cartItem: [], totalItems: 0 }; // Return data on success
        }catch (error) {
            dispatch(
                uiActions.showNotification({
                    status:"error",
                    title: "Error!",
                    message: error.message || "Fetching Cart Data Failed!",
            })
        );
            return rejectWithValue(error.message);
        }
    });

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart(state, action){
            const newItem = action.payload;
            const exists = state.cartItem.find((item)=> item.title === newItem.title);
            
            if(!exists){
                state.cartItem.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: newItem.price,
                    quantity:1,
                    total: newItem.price
                });
            }else{
                exists.quantity++;
                exists.total = exists.total + newItem.price;
            }
            state.totalItems++;
            state.changed = true;
        },
        removeFromCart(state, action){
            const id = action.payload;
            const exists = state.cartItem.find((item)=> item.id === id);
            state.totalItems--;
            exists.total = exists.total - exists.price;
            if(exists.quantity === 1){
                state.cartItem = state.cartItem.filter((item)=> item.id !== id);   
            }else{    
                exists.quantity--;
            }
            state.changed = true;
        },
        increaseCart(state, action){
            const id = action.payload;
            const exists = state.cartItem.find((item)=> item.id === id);
            state.totalItems++;
            
            if(exists){
                exists.quantity++;
                exists.total = exists.total + exists.price;
            }
            state.changed = true;
        },
        replaceCart(state, action) {
            state.totalItems = action.payload.totalItems;
            state.cartItem = action.payload.cartItem || []; 
        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(sendCartData.fulfilled, (state, action)=>{
                state.changed = false;
            })
            .addCase(fetchCartData.fulfilled, (state, action)=>{
                state.cartItem = action.payload.cartItem || [];
                state.totalItems = action.payload.totalItems || 0;
                // Dispatch success notification here as it relates to state update completion
                // This requires the reducer to have access to dispatch, which is not default.
                // So keeping notifications in the thunk is simpler for now.
            })
            .addCase(fetchCartData.rejected, (state, action)=>{
                // State update on fetch failure if needed
                console.error("Failed fetching data", action.payload);
            })
    }
});


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

//     return async (dispatch) => {
    // export const fetchCartData = () => {
    //         
        // const fetchData = async () => {
        //     const response = await fetch(
        //         `https://ecommerce-site-9c080-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json`
        //     );

        //     if (!response.ok) {
        //         throw new Error('Could not fetch cart data!');
        //     }

        //     const data = await response.json();

        //     return data;
//         };

//         try {
//             const cartData = await fetchData();
            // dispatch(cartActions.replaceCart(cartData));
            // dispatch(
            //     uiActions.showNotification({
            //         status:"success",
            //         title: "Success",
            //         message: "Fetched cart data SuccessFully!",
            // }));
        // } catch (error) {
        //     dispatch(
        //         uiActions.showNotification({
        //             status:"error",
        //             title: "Error!",
        //             message: "Fetching Cart Data Failed!",
        //     }));
        // }
//     }
// };

// export const sendCartData = (cart) =>{
//     return async (dispatch)=>{
        // dispatch(
        //     uiActions.showNotification({
        //         status:"pending",
        //         title: "Sending",
        //         message: "Sending Cart Data!",
        //     }));
//         const sendRequest = async () =>{
//             const res = await fetch(`https://ecommerce-site-9c080-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json`, {
//                 method: 'PUT',
//                 body:JSON.stringify(cart),
//             });
            
//             if(!res.ok){
//                 throw new Error("Error Sending Data!!");
//             }
//         }
//         try{
//             await sendRequest();
            // dispatch(
            //     uiActions.showNotification({
            //         status:"success",
            //         title: "Success",
            //         message: "Sent cart data SuccessFully!",
            //     }));
//         }catch(err){
            // dispatch(
            //     uiActions.showNotification({
            //         status:"error",
            //         title: "Error!",
            //         message: "Sending Cart Data Failed!",
            //     }));
//             }
//         }
// };

    
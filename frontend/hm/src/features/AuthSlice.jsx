import {createSlice} from '@reduxjs/toolkit';

let AuthSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload;
        },
        removeUser:(state)=>{
            state.user=null;
        }
    }
});

export const {setUser,removeUser}= AuthSlice.actions;
export default AuthSlice.reducer;
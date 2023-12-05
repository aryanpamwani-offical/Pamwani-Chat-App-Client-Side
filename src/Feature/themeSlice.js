import {createSlice} from "@reduxjs/toolkit";
let initialValue=true;

export  const themeSlice=createSlice({
    name:"themeSlice",
    initialState:initialValue,
    reducers:{
        toggleTheme:(state)=>{
            return state=!state;
        }
    }
})
export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;
import {createSlice} from "@reduxjs/toolkit";
let initialValue=true;

export  const sliderSlice=createSlice({
    name:"sliderSlice",
    initialState:initialValue,
    reducers:{
        toggleSlice:(state)=>{
            return state=!state;
        }
    }
})
export const {toggleSlice} = sliderSlice.actions;
export default sliderSlice.reducer;
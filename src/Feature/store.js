import {configureStore} from "@reduxjs/toolkit";
import themeSliceReducer from './themeSlice'
import refreshSidebar from "./refreshSlice";
import sliderSlice from './sliderSlice'
export const store=configureStore({
    reducer:{
        themeKey:themeSliceReducer,
        refreshKey: refreshSidebar,
        toggleSlice:sliderSlice,
    }
})

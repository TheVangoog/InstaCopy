import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "redux";

import userSlice from "./userSlice";

export default configureStore({
    reducer: {
        user: userSlice
    } 
});
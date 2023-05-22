import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/Auth/auth";

export const store = configureStore({
    reducer: {
        auth: AuthReducer
    }
})
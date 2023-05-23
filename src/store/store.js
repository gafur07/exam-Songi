import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/Auth/auth";
import HomeReducer from "./reducers/Home/home.slice";

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        todos: HomeReducer
    },
    devTools: true
})
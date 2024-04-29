import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import querySlice from "./querySlice";
export const store = configureStore(
    {
        reducer: {
            theme: themeReducer,
            query: querySlice
        }
    }
)
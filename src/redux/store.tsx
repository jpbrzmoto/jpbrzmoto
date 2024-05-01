import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import querySlice from "./querySlice";
import dataSourceSlice from "./dataSourceSlice";
export const store = configureStore(
    {
        reducer: {
            theme: themeReducer,
            query: querySlice,
            datasource: dataSourceSlice
        }
    }
)
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import querySlice from "./querySlice";
import dataSourceSlice from "./dataSourceSlice";
import contextDBSlice from "./contextDBSlice";

export const store = configureStore(
    {
        reducer: {
            theme: themeReducer,
            query: querySlice,
            datasource: dataSourceSlice,
            contextdb: contextDBSlice
        }
    }
)
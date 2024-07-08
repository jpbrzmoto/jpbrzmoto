import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    defaultTheme: "Cobalt2.json",
    theme: ""
}

export const themeSlice = createSlice(
    {
        name: "theme",
        initialState,
        reducers: {
            configureTheme: (state, action) => {                
                state.theme = action.payload;
            }
        }
    }
);
export const { configureTheme } = themeSlice.actions;
export default themeSlice.reducer;
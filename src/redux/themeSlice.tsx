import { createSlice } from "@reduxjs/toolkit";

//const initialState = "GitHub.json";
const initialState = {
    theme: "GitHub.json"
}

export const themeSlice = createSlice(
    {
        name: "theme",
        initialState,
        reducers: {
            configureTheme: (state, action) => {
                /*const { theme } = action.payload;
                state = theme;*/
                state.theme = action.payload;

            }
        }
    }
);
export const { configureTheme } = themeSlice.actions;
export default themeSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    previousIndex: 0,
    selectedIndex: 0,
    queryList: ["-- sql query -- \n"]
}

export const querySlice = createSlice(
    {
        name: "query",
        initialState,
        reducers: {
            setQuery: (state, action) => {
                const { index, query } = action.payload;
                state.queryList[index] = query;
            },
            setSelectedIndex: (state, action) => {
                const { index } = action.payload;
                state.previousIndex = (state.selectedIndex === 0) ? 0 : state.selectedIndex;
                state.selectedIndex = index;
            }
        }
    }
);
export const { setQuery, setSelectedIndex } = querySlice.actions;
export default querySlice.reducer;
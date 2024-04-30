import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    previousIndex: 0,
    selectedIndex: 0,
    queryList: ["-- sql query -- \n"],
    selectedDataSource: [{ name: "RH001", state: "enable", datasource: "MRH001" }]
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
            },
            setSelectedDataSource: (state, action) => {
                const { index, dataSource } = action.payload;
                state.selectedDataSource[index] = dataSource;
            }
        }
    }
);
export const { setQuery, setSelectedIndex, setSelectedDataSource } = querySlice.actions;
export default querySlice.reducer;
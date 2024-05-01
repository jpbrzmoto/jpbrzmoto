import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    selectedTab: 0,
    selectedDataSources: [[]]
}

export const dataSourceSlice = createSlice(
    {
        name: "datasource",
        initialState,
        reducers: {
            setDataSources: (state, action) => {
                state.selectedDataSources[state.selectedTab] = action.payload;
            },
            setSelectedTab: (state, action) => {
                state.selectedTab = action.payload;
            }
        }
    }
);

export const { setDataSources, setSelectedTab } = dataSourceSlice.actions;
export default dataSourceSlice.reducer;
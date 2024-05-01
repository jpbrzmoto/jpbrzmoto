import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    selectedTab: 0,
    selectedDataSources: [[]],
    selectedCatalogs: [[]]
}

export const dataSourceSlice = createSlice(
    {
        name: "datasource",
        initialState,
        reducers: {
            setDataSources: (state, action) => {
                state.selectedDataSources[state.selectedTab] = action.payload;
            },
            addCatalog: (state, action) => {
                const { catalog } = action.payload;
                const selectedTab = state.selectedTab;
                const updatedSelectedCatalogs = [...state.selectedCatalogs];
                if (!updatedSelectedCatalogs[selectedTab]) {
                    updatedSelectedCatalogs[selectedTab] = [];
                }
                updatedSelectedCatalogs[selectedTab].push(catalog);
                state.selectedCatalogs = updatedSelectedCatalogs;
            },
            removeCatalog: (state, action) => {
                const { catalog } = action.payload;
                console.log("TAB", state.selectedTab);
                console.log("CATALOG", catalog);
                state.selectedCatalogs[state.selectedTab]?.pop(catalog);
            },
            setSelectedTab: (state, action) => {
                state.selectedTab = action.payload;
            }
        }
    }
);

export const { setDataSources, setSelectedTab, addCatalog, removeCatalog } = dataSourceSlice.actions;
export default dataSourceSlice.reducer;
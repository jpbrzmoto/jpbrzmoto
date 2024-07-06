import { createSlice } from "@reduxjs/toolkit";
import {ContextDB} from "../models/contextDB.model"

const defaultQuery = "-- sql query -- \n";

export const initialState: {
    selectedTab: number;
    contextDB: ContextDB[];
} = {
    selectedTab: 0,
    contextDB: [
        {
             sql: defaultQuery,
             dataSources:[],
             dataBases:[],
             results:[]
        }
    ]
};

export const contextDBSlice = createSlice(
    {
        name: "contextdb",
        initialState,
        reducers: {                     
            setSelectedTab: (state, action) => {
                state.selectedTab = action.payload;              
            },
            newContextDB: (state, action) => {
                state.selectedTab = action.payload;
                if (!state.contextDB[state.selectedTab]){                    
                    state.contextDB[state.selectedTab] = {
                        sql: defaultQuery,
                        dataSources: [],
                        dataBases: [],
                        results:[]
                      };
                }
            },
            addDataSources: (state, action) => {
                const { datasources } = action.payload;
                if (state.contextDB[state.selectedTab]) {                    
                    state.contextDB[state.selectedTab].dataSources = [...datasources];
                }                
            },
            pushDataSource: (state, action) => {
                const { datasource } = action.payload;
                if (state.contextDB[state.selectedTab]) {
                    state.contextDB[state.selectedTab].dataSources.push(datasource);
                }                
            },
            addDataBase: (state, action) => {
                const { database } = action.payload;
                console.log("base:", database);
                
                if (state.contextDB[state.selectedTab]) {
                    state.contextDB[state.selectedTab].dataBases.push(database);
                }                
            },
            removeDataSource: (state, action) => {
                const { datasource } = action.payload;                              

                if (state.contextDB[state.selectedTab]) {
                    state.contextDB[state.selectedTab].dataSources = state.contextDB[state.selectedTab].dataSources.filter(
                      ds => ds.name !== datasource.name
                    );
                }               
            },
            removeDataBase: (state, action) => {
                const { database } = action.payload;               
                

                if (state.contextDB[state.selectedTab]) {
                    state.contextDB[state.selectedTab].dataBases = state.contextDB[state.selectedTab].dataBases.filter(
                      db => db.name !== database.name
                    );
                }               
            },
            setContextQuery: (state, action) => {
                const {sql} = action.payload;
                if (state.contextDB[state.selectedTab]) {
                    state.contextDB[state.selectedTab].sql = sql ;
                }
            },
            addContextResult: (state, action) => {
                const {result} = action.payload;
                if (state.contextDB[state.selectedTab]) {
                    state.contextDB[state.selectedTab].results.push(result);
                }
            },
            cleanContextResult: (state) => {                
                if (state.contextDB[state.selectedTab]) {
                    state.contextDB[state.selectedTab].results = [];
                }
            }                  
        }
    }
);

export const { 
    newContextDB, 
    setSelectedTab, 
    addDataSources, 
    pushDataSource, 
    addDataBase,
    removeDataSource, 
    removeDataBase, 
    setContextQuery,
    addContextResult,
    cleanContextResult
} = contextDBSlice.actions;
export default contextDBSlice.reducer;
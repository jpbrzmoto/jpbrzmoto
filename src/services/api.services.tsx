import axios from 'axios';
import { QueryModel } from '../models/query.model';

const url = "http://localhost:5000";//5000 o 5280

const _connectionStrings = [
    { name: "ITRAARHPDBE001", value: "Server=tcp:ITRAARHPDBE001.Vlatamdev.azure;Initial Catalog=MetaDB;Persist Security Info=False;User ID=rhproadmin;Password=rL[PO2Ua74Pg7Y%;MultipleActiveResultSets=False;Connection Timeout=30;" },
    { name: "IDRAARHPDBE001", value: "Server=tcp:IDRAARHPDBE001.Vlatamdev.azure;Persist Security Info=False;User ID=rhproadmin;Password=rhpro#2018ADMIN;TrustServerCertificate=False;Connection Timeout=30;" },
    { name: "IDRAARHPDB004", value: "Server=tcp:IDRAARHPDB004.Vlatamdev.azure;Persist Security Info=False;User ID=rhproadmin;Password=rhpro#2018ADMIN;TrustServerCertificate=False;Connection Timeout=30;" }
];


export const postQuery = async (data: QueryModel) => {
    try {//http://localhost:5000
        //const response = await axios.post('http://localhost:5280/api/query', data);
        const response = await axios.post(`${url}/api/query`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getDataBases = (source: string) => {
    const connString = _connectionStrings.find(obj => obj.name === source) || { name: "", value: "" };
    return axios.get(`${url}/api/databases/${encodeURIComponent(connString.value)}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
};


export const getTables = (source: string, catalog: string) => {
    //const connString = _connectionStrings.find(obj => obj.name === source) || { name: "", value: "" };
    return axios.get(`${url}/api/databases/${encodeURIComponent(source)}/${encodeURIComponent(catalog)}/tables`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
};

export const getViews = (source: string, catalog: string) => {
    //const connString = _connectionStrings.find(obj => obj.name === source) || { name: "", value: "" };
    return axios.get(`${url}/api/databases/${encodeURIComponent(source)}/${encodeURIComponent(catalog)}/views`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
};


export const getProgrammability = (source: string, catalog: string) => {
    //const connString = _connectionStrings.find(obj => obj.name === source) || { name: "", value: "" };
    return axios.get(`${url}/api/databases/${encodeURIComponent(source)}/${encodeURIComponent(catalog)}/programmability`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
};


/*
export const getDataBases = (connString: string) => {
    try {//http://localhost:5000         
        const response = axios.get(`http://localhost:5000/api/databases/${encodeURIComponent(connString)}`);
        return response;
    } catch (error) {
        console.log(error);
    }
};*/
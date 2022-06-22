// getBalance getStocks ValidateOrder  ExecuteOrder

import { API_URL } from './config';
import axios from 'axios'


const getUserDetails = async () => {
    const response = axios("/API", {
        method: "GET",
        mode: 'cors',
        headers: {
        }
    });
    return response;
};

const getStocks = async () => {
    const response = axios("/API/GetStocks", {
        method: "POST",
        mode: 'cors',
        headers: {
        }
    });
    return response;
};

const validateOrder = async (params) => {
    const response = axios.post("/API/ValidateOrder", params, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
};

const executeOrder = async (params) => {
    const response = axios.post("/API/ExecuteOrder", params, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
};

export { getUserDetails, getStocks, validateOrder, executeOrder };
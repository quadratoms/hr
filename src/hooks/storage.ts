import axios from 'axios';
import { useState, useEffect } from 'react';


const apiUrl = process.env.REACT_APP_BASE_API;
export const api =()=> axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem('token')||"")
    }
})

export const authApi =()=> axios.create({
    baseURL: apiUrl,
})

export function useUser() {
    const [userData, setUserData] = useState(() => {
        // Retrieve the value from localStorage or default to false
        const stoblueValue = localStorage.getItem('userData');
        return stoblueValue ? JSON.parse(stoblueValue) : {};
    });

    useEffect(() => {
        // Update localStorage whenever userData changes
        localStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);

    return { userData, setUserData };
}

export function useToken() {
    const [token, setToken] = useState(() => {
        // Retrieve the value from localStorage or default to an empty array
        const stoblueValue = localStorage.getItem('token');
        return stoblueValue ? JSON.parse(stoblueValue) : "";
    });

    useEffect(() => {
        // Update localStorage whenever token changes
        localStorage.setItem('token', JSON.stringify(token));
    }, [token]);

    return { token, setToken };
}

export function useIsLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // Retrieve the value from localStorage or default to '1'
        const stoblueValue = localStorage.getItem('isLoggedIn');
        return stoblueValue ? JSON.parse(stoblueValue) : false;
    });

    useEffect(() => {
        // Update localStorage whenever isLoggedIn changes
        console.log("change");

        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    return { isLoggedIn, setIsLoggedIn };
}

export function useTransaction() {
    const [transactions, setTransactions] = useState<any>([]);



    return { transactions, setTransactions };
}


export async function getTransactionHistory() {
    try {
        const response = await api().get(`/transaction`)
        return response.data?.data
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
   
        
        return []
};

export async function UpdateAndGetUser(data:any) {
    try {
        const response = await api().put(`/user`, data)
        return response.data?.data
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
   
        
        return []
};


export function djangoToHtmlType(djangoType:string) {
    switch (djangoType) {
        case 'CharField':
            return 'text';
        case 'IntegerField':
            return 'number';
        case 'DateField':
            return 'date';
        case 'EmailField':
            return 'email';
        case 'DecimalField':
            return 'number'; // You might want to customize this based on your requirements
        case 'BooleanField':
            return 'checkbox';
        case 'TextField':
            return 'textarea';
        default:
            return 'text';
    }
}
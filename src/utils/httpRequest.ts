import {logoutAction} from "../features/auth/authActions.ts";

export const apiUrl = 'http://localhost:3000';

const handleUnauthorized = (dispatch: any) => {
    console.log('12345');
    const test= dispatch(logoutAction());
    console.log(test);
};

interface apiRequestInterface {
    endpoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: any
    dispatch: any
}

export const apiRequest = async (
    {
        endpoint,
        method,
        body,
        dispatch,
    }:
    apiRequestInterface) => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',

    };

    if (body) {
        body = JSON.stringify(body);
    }

    const options: RequestInit = {
        method,
        headers,
        body,
        credentials: 'include',
    };

    try {
        const response = await fetch(`${apiUrl}${endpoint}`, options);

        if (response.status === 401) {
            handleUnauthorized(dispatch);
        }

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
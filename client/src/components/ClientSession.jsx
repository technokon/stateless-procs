'use client'
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const SessionContext = createContext(null);
export const ClientSession = ({ children }) => {
    console.log('rendering client session')
    const [session, setSession] = useState(false);
    // fetch session
    useEffect(() => {
        axios.get('http://localhost:5000/api/auth/status', { withCredentials: true })
            .then((response) => {
                const loggedIn = response.data.loggedIn;
                setSession(loggedIn);
            })
            .catch((error) => {
                console.log('Failed to get user session', error);
                setSession(false);
            });
    },[])

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    )
};

'use client'

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from '@/components/Loader';
import { Error } from '@/components/Error';
import { useRouter, useSearchParams } from 'next/navigation';
import { SessionContext } from '@/components/ClientSession';

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const { setSession } = useContext(SessionContext);
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setForm(form => ({
            ...form,
            [e.target.name]: e.target.value,
        }));
    };
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirectTo') || '/';

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post('http://localhost:5000/api/auth/login', form, { withCredentials: true })
            .then(res => {
                console.log('Response back', res.data);
                setUser(res.data);
                setSession(true);
            })
            .catch(err => {
                setError(err.response.data?.message || 'Login Failed!');
                console.log('Error:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
      setSession(false);
    }, []);

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                router.push(redirectTo);
            }, 3000);
        }
    }, [user]);
    return (
        <>
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">{ !user ? 'Login' : 'Thank you!' }</h1>
            {!loading && !user && (
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username"
                               className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input id="username" type="text" name="username" onChange={handleChange}
                               autoComplete="username"
                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <label htmlFor="password"
                               className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input id="password" type="password" name="password" onChange={handleChange}
                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <button type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">Login
                    </button>
                    {error && <Error error={error}/> }
                </form>
            )}
            {loading && <Loader/>}
            {user && !loading &&
                <div>Login Successful! {user.username}</div>
            }
        </>
    );
}
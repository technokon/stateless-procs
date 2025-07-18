'use client';
import { useState } from 'react';
import axios from 'axios';
import { Loader } from '@/components/Loader';
import { Error } from '@/components/Error';

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm(form => ({
                ...form,
                [e.target.name]: e.target.value,
            }
        ));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        axios.post('http://localhost:5000/api/auth/register', form, { withCredentials: true })
            .then(res => {
                console.log('Response back', res.data);
                setUser(res.data);
            })
            .catch(err => {
                setError(err.response.data?.message || 'Registration Failed!');
                console.log('Error:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome to the registration page</h1>
                {loading && <Loader/>}
                {!user && !loading && (
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username"
                                   className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input id="username" type="text" name="username" onChange={handleChange}
                                   autoComplete="username"
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <div>
                            <label htmlFor="email"
                                   className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input id="email" type="email" name="email" onChange={handleChange} autoComplete="email"
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <div>
                            <label htmlFor="password"
                                   className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input id="password" type="password" name="password" onChange={handleChange}
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <button type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">Register
                        </button>
                        {error && <Error error={error}/> }
                    </form>
                )}
                {user && !loading &&
                    <div>Registration Successful! {user.username}</div>
                }
            </div>
        </div>
    )
}
'use client'

import { Error } from '@/components/Error';
import { Loader } from '@/components/Loader';
import { useEffect, useState } from 'react';

export default function Password() {
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const handleChange = (e) => {
        setForm(data => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    }
    const onSubmit = (e) => {
        const { password, repeatPassword } = form;
        e.preventDefault();
    }
    useEffect(() => {
        const { password, repeatPassword } = form;
        if (password !== repeatPassword) {
            setError('Passwords do not match!');
        } else {
            setError('');
        }
    }, [form.password, form.repeatPassword])

    return (
        <>
            <h2 className="text-1xl font-bold mb-6 text-center text-gray-800">Change your password</h2>
            {!loading && (
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="existing-password"
                               className="block text-sm font-medium text-gray-700 mb-1">Existing Password</label>
                        <input id="existing-password" type="password" name="existingPassword" onChange={handleChange}
                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <label htmlFor="password"
                               className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input id="password" type="password" name="password" onChange={handleChange}
                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <label htmlFor="repeat-password"
                               className="block text-sm font-medium text-gray-700 mb-1">Repeat Password</label>
                        <input id="repeat-password" type="password" name="repeatPassword" onChange={handleChange}
                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <button type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">Login
                    </button>
                    {error && <Error title="Please check" error={error}/> }
                </form>
            )}
            {loading && <Loader/>}
        </>
    )
};

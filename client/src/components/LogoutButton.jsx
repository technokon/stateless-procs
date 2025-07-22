'use client'
import { Button } from '@/components/Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { SessionContext } from '@/components/ClientSession';

export const LogoutButton = props => {
    const router = useRouter();
    const { setSession } = useContext(SessionContext);
    console.log('rendering logout')
    const logout = () => {
        console.log('clicking lgout');
        axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true })
            .then(() => {
                router.push('/');
                setSession(false);
            });
    }
    return (
        <Button className="cursor-pointer hover:underline" onClick={logout}>Logout</Button>
    )
};
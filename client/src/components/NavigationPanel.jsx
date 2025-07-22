'use client'
import { LogoutButton } from '@/components/LogoutButton';
import { useContext } from 'react';
import { SessionContext } from '@/components/ClientSession';
import Link from 'next/link';

export const NavigationPanel = (props) => {
    const { session } = useContext(SessionContext);
    return (
        <nav className="flex gap-2 ml-1">
            { session && <LogoutButton/> }
            { !session && <Link key="login" className="hover:underline" href="/login">Login</Link> }
            <Link key="home" className="hover:underline" href="/">Home</Link>
        </nav>
    )
}
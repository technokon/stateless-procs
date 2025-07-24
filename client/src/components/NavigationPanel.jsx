'use client'
import { LogoutButton } from '@/components/LogoutButton';
import { useContext } from 'react';
import { SessionContext } from '@/components/ClientSession';
import Link from 'next/link';

export const NavigationPanel = (props) => {
    const { session } = useContext(SessionContext);
    return (
        <nav className="flex gap-2 ml-1 mb-4">
            { !session && <Link key="login" className="hover:underline" href="/login">Login</Link> }
            { session && (
                <>
                    <LogoutButton />
                    <Link key="settings" className="hover:underline" href="/settings">Settings</Link>
                    <Link key="dashboard" className="hover:underline" href="/dashboard">Dashboard</Link>
                </>
            )}
            <Link key="home" className="hover:underline" href="/">Home</Link>
        </nav>
    )
}
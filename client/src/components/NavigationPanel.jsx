import { cookies } from 'next/headers';
import { LogoutButton } from '@/components/LogoutButton';

export const NavigationPanel = async (props) => {
    const cookieStore = await cookies();
    const token = await cookieStore.get('token')?.value;
    console.log('rendering navigation')
    return (
        <nav className="flex gap-2 ml-1">
            { token && <LogoutButton/> }
            { !token && <a className="hover:underline" href="/login">Login</a> }
            <a className="hover:underline" href="/">Home</a>
        </nav>
    )
}
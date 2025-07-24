import Link from 'next/link';

export default function Layout ({ children }) {
    return (
        <div className="flex flex-row min-h-screen min-w-screen">
            <nav className="pr-8 flex w-auto flex-nowrap flex-col mt-10 border-r-2 border-gray-300">
                <Link className="hover:underline" key="settings-home" href="/settings">Settings</Link>
                <Link className="hover:underline" key="settings-password" href="/settings/password">Change Password</Link>
            </nav>
            <div className="flex flex-col pl-8 w-2/3">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Settings</h1>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}
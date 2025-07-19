
import { cookies } from 'next/headers';

export default async function Home() {
    const cookieStore = await cookies();
    const token = await cookieStore.get('token')?.value;
    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                {!token && (
                    <>
                        <div className="flex gap-4 items-center flex-col sm:flex-row">
                            <a href="/register">Registration</a>
                        </div>
                        <div className="flex gap-4 items-center flex-col sm:flex-row">
                            <a href="/login">Login</a>
                        </div>
                    </>
                )}
                {token && (
                    <div className="flex gap-4 items-center flex-col sm:flex-row">
                        <a href="/dashboard">Dashboard</a>
                    </div>
                )}
            </main>
        </div>
    );
}

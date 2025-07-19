import axios from 'axios';
import { Error } from '@/components/Error'
import { cookies } from 'next/headers';

export default async function Dashboard() {
    const cookieStore = await cookies();
    const token = await cookieStore.get('token')?.value;
    const users = [];
    let error = '';
    try {
        const response = await axios.get('http://localhost:5000/api/user', {
            headers: {
                Cookie: `token=${token}`
            }
        });
        users.push(...response.data.users);
        console.log(users);
    } catch (err) {
        error = err.response.data?.message || 'Error occurred!';
        console.log(err);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center">
                    {!!users.length && (
                        <table className="table-auto w-full">
                            <thead>
                            <tr>
                                <th className="text-left">
                                    username
                                </th>
                                <th className="text-left">
                                    email
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                users.map(({ username, email }) => (
                                    <tr key={username}>
                                        <td className="text-left">{username}</td>
                                        <td className="text-left">{email}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    )}
                    { error && <Error error={error} /> }
                    { !error && !users.length && (<div>No users found.</div>)}
                </div>
            </div>
        </div>
    );
}
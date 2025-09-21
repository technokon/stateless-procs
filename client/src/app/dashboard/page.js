import axios from 'axios';
import { Error } from '@/components/Error'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import Link from 'next/link';

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = await cookieStore.get('token')?.value;
  const users = [];
  const currentPath = (await headers()).get('x-pathname') || '/dashboard';
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
    if (err?.status === 401) {
      console.log(err?.status, 'redirecting to login');
      redirect(`/login?redirectTo=${encodeURIComponent(currentPath)}`);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Users of the app</h1>
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
                users.map(({ username, email, _id }) => (
                  <tr key={username}>
                    <td className="text-left">
                      <Link href={`/dashboard/user-details/${_id}`}>
                        {username}
                      </Link>
                    </td>
                    <td className="text-left">{email}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )}
        {error && <Error error={error} />}
        {!error && !users.length && (<div>No users found.</div>)}
      </div>
    </>
  );
}
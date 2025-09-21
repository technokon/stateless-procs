'use client'

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function UserDetails() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${id}`, { withCredentials: true });
        const data = response?.data;
        setUser(data);
      } catch (error) {
        console.log(`Error retrieving user: ${error.error}`, error);
        setError(error.error || 'Uknown error. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">User details</h1>
      {!loading && user && (<ul>
        <li>Username: {user.username}</li>
        <li>Email: {user.email}</li>
      </ul>)}
      { error && (
        <div>Error occured: {error}</div>
      )}
    </>
  )
}
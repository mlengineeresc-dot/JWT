import React, { useEffect, useState } from "react";

const FetchUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 useEffect(() => {
   const fetchUsers = async () => {
     try {
       setLoading(true);
       const res = await fetch("https://fakestoreapi.com/users");
       const users = await res.json();
       setData(users);
     } catch {
       setError(true);
     } finally {
       setLoading(false);
     }
   };

   fetchUsers();
 }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  return (
    <div>
      {data.map((user) => (
        <li key={user.id}>{user.username}</li>
      ))}
    </div>
  );
};

export default FetchUsers;

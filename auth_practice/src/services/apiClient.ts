const API_URL = "http://localhost:3001/users";

export const fetchUsers = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const addUser = async (newUser:string) =>
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  }).then((res) => res.json());

export const deleteUser = async (id:number) =>
  fetch(`${API_URL}/${id}`, { method: "DELETE" }).then((res) => res.json());

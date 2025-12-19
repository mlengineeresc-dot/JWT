import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function GetUser() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3001/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });

  
  const addUserMutation = useMutation({
    mutationFn: async (user: any) => {
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });


  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`http://localhost:3001/users/${id}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

 
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error occurred</p>;


  function handleAddUser(e: any) {
    e.preventDefault();
    const name = e.target.name.value;

    addUserMutation.mutate({ name });

    e.target.reset();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>React Query - CRUD in One File</h2>

      <form onSubmit={handleAddUser}>
        <input name="name" placeholder="Enter name" required />
        <button type="submit" disabled={addUserMutation.isLoading}>
          Add User
        </button>
      </form>

      <ul style={{ marginTop: "20px" }}>
        {data?.map((user: any) => (
          <li key={user.id} style={{ marginBottom: "10px" }}>
            {user.name}

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => deleteUserMutation.mutate(user.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

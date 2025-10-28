import React, { useEffect, useState } from "react";
import { todoServices } from "../services/todoServices";
import { Link } from "react-router";

const PendingTodos = () => {
  const [pending, setPending] = useState([]);

  const fetchPending = async () => {
    try {
      const todos = await todoServices.getAllTodos();
      const pendingTodos = todos.data.filter((t) => t.status === "pending");
      setPending(pendingTodos);
    } catch (error) {
      console.error("Error fetching pending todos:", error);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div className="p-4">
      <h2 className="border-b-2 mb-3 text-xl font-bold">Pending Todos</h2>

      {pending.length === 0 ? (
        <p>No pending todos 🎉</p>
      ) : (
        <ul>
          {pending.map((ele) => (
            <li key={ele.id} className="border-b py-2">
              {ele.todo}
            </li>
          ))}
        </ul>
      )}
      <Link to="/" className="text-blue-500 underline mb-4 block">
        Back
      </Link>
    </div>
  );
};

export default PendingTodos;

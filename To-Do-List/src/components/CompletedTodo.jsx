import React, { useEffect, useState } from "react";
import { todoServices } from "../services/todoServices";
import { Link } from "react-router";

const CompletedTodos = () => {
  const [completed, setCompleted] = useState([]);

  const fetchCompleted = async () => {
    try {
      const todos = await todoServices.getAllTodos();
      const completedTodos = todos.data.filter((t) => t.status === "completed");
      setCompleted(completedTodos);
    } catch (error) {
      console.error("Error fetching completed todos:", error);
    }
  };

  useEffect(() => {
    fetchCompleted();
  }, []);

  return (
    <div className="p-4">
      <h2 className="border-b-2 mb-3 text-xl font-bold">Completed Todos</h2>

      {completed.length === 0 ? (
        <p>No completed todos yet </p>
      ) : (
        <ul>
          {completed.map((ele) => (
            <li
              key={ele.id}
              className="border-b py-2 line-through text-gray-500"
            >
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

export default CompletedTodos;

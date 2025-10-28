import React, { useEffect, useState } from "react";
import { todoServices } from "../services/todoServices";

const AllTodos = () => {
  const [todo, setTodo] = useState([]);

  const fetchTodo = async () => {
    try {
      const todos = await todoServices.getAllTodos();
      setTodo(todos.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";

    try {
      await todoServices.updateTodo(id, { status: newStatus });
      fetchTodo();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <div className="p-4">
      <p className="border-b-2 mb-2 text-lg font-semibold">All Todos</p>

      <ul>
        {todo.map((ele) => (
          <li
            key={ele.id}
            className="flex justify-between items-center border-b py-2 gap-6"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={ele.status === "completed"}
                onChange={() => handleToggleStatus(ele.id, ele.status)}
                className="w-5 h-5 rounded-full accent-green-500 cursor-pointer"
              />
              <span
                className={
                  ele.status === "completed"
                    ? "line-through text-gray-500"
                    : "text-black"
                }
              >
                {ele.todo}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTodos;

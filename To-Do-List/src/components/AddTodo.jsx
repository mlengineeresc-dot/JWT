import React, { useState } from "react";
import Input from "../common/ui/Input";
import Button from "../common/ui/Button";
import { todoServices } from "../services/todoServices";
import { useNavigate } from "react-router";

const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setTodo(e.target.value);
    console.log(todo);
  };
  const handleClick = async () => {
    // const postTodo = await todoServices.postTodo(todo);

    const response = await todoServices.postTodo({
      todo: todo,
      status: "pending",
    });
    console.log("Todo added:", response.data);
    setTodo("");
    navigate("/");
  };

  return (
    <div className=" shadow-sm ">
      <Input
        type="text"
        placeholder="Enter Todo"
        className="border p-2  "
        onChange={(e) => handleChange(e)}
        value={todo}
      />
      <Button
        label="Add"
        className="border bg-blue-500 rounded p-2"
        onClick={handleClick}
      />
    </div>
  );
};

export default AddTodo;

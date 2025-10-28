import React from "react";
import { Link } from "react-router";

const Sidebar = () => {
  return (
    <aside className="flex flex-col min-h-screen w-80 border bg-amber-100 py-4 px-8 gap-2">
      <Link to="/add">Add Todo</Link>
      <Link to="/">All Todo</Link>
      <Link to="/completed">Completed Todo</Link>
      <Link to="/pending">Pending Todo</Link>
      <Link to="/delete">Delete Todo</Link>
    </aside>
  );
};

export default Sidebar;

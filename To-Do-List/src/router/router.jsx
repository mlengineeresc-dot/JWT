import { createBrowserRouter } from "react-router";
import MainPageLayout from "../layout/MainPageLayout";
import AddTodo from "../components/AddTodo";
import PendingTodo from "../components/PendingTodo";
import DeleteTodo from "../components/DeleteTodo";
import CompletedTodo from "../components/CompletedTodo";
import AllTodo from "../components/AllTodos"
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPageLayout />,
    children: [
      {
        index: true,
        element: <AllTodo />,
      },
      {
        path: "/add",
        element: <AddTodo />,
      },
      {
        path: "/pending",
        element: <PendingTodo />,
      },
      {
        path: "/delete",
        element: <DeleteTodo />,
      },
      {
        path:"/completed",
        element:<CompletedTodo />
      }
    ],
  },
]);

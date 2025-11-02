import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Main from "../components/Main";
import AddProduct from "../components/AddProduct";
import CardDetails from "../common/ui/CardDetails";
import Error from "../common/ui/Error";
import Cart from "../components/Cart";
import DeleteProduct from "../components/DeleteProduct";
import ConfirmModal from "../common/ui/ConfirmModal";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/carddetail/:id",
        element: <CardDetails />,
      },
      {
        path: "/editproduct/:id",
        element: <AddProduct />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/deleteproduct/:id",
        element: <DeleteProduct />,
      },

      {
        path: "/addproduct",
        element: <AddProduct />,
      },
    ],
  },
]);

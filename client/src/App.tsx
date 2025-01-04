import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{ element: <Home />, index: true }],
  },
  { element: <Register />, path: "register" },
  { element: <Login />, path: "login" },
  { path: "*", element: <PageNotFound /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

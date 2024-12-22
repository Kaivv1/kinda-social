import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import LandingPage from "./pages/LandingPage/LandingPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "app", element: <Home />, children: [] },
    ],
  },
  { path: "*", element: <PageNotFound /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

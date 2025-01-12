import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{ element: <Home />, index: true }],
  },
  { element: <Register />, path: "register" },
  { element: <Login />, path: "login" },
  { path: "*", element: <PageNotFound /> },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />;
      <Toaster
        toastOptions={{
          position: "top-right",
          className: "toasts",
          duration: 2500,
        }}
      />
    </QueryClientProvider>
  );
}

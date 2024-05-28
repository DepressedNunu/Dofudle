import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "@/pages/Home";
import "/app/globals.css";
import Spells from "@/pages/Spells";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/spells",
        element: <Spells />,
    },
]);



const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
);
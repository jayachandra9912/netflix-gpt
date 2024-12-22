import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

const Body = () => {
    const appRouter = createBrowserRouter(
        [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "/browse",
                element: <Browse />,
            },
        ],
        { basename: "/netflix-gpt" } // Use basename for subdirectory deployments
    );

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
};

export default Body;

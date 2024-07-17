import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
import RedirectPage from "./pages/RedirectPage/RedirectPage";
import AirConditioner from "./components/AirConditioner/AirConditioner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        element: <Join />,
      },
      {
        path: "/chat",
        element: (
          <RedirectPage>
            <Chat />
          </RedirectPage>
        ),
      },
      {
        path: "/air",
        element: (
          <RedirectPage>
            <AirConditioner />
          </RedirectPage>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

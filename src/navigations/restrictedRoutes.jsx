import React, { lazy } from "react";
import ROUTES from "./routes";


const Home = lazy(() => import("../features/home"));
const Dashboard = lazy(() => import("../features/products/pages/dashboard"));

export const restrictedRoutes = [
    { path: ROUTES.HOME, element: <Home /> },
    { path: ROUTES.DASHBOARD, element: <Dashboard /> },
];
 
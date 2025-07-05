import React, { lazy } from "react";
import ROUTES from "./routes";


const Home = lazy(() => import("../features/home"));
const ProductManagement = lazy(() => import("../features/products/pages/dashboard"));
const CustomerManagement = lazy(() => import("../features/products/customer"));
// const InventoryManagement = lazy(() => import("../features/products/pages/inventoryManagement"));
const Dashboard = lazy(() => import("../features/products/pages/dashboard"));

export const restrictedRoutes = [
    { path: ROUTES.HOME, element: <Home /> },
    { path: ROUTES.PRODUCT_MANAGEMENT, element: <ProductManagement /> },
    { path: ROUTES.CUSTOMER_MANAGEMENT, element: <CustomerManagement /> },
    { path: ROUTES.DASHBOARD, element: <Dashboard /> },
];
 
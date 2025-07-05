import React, { lazy } from "react";
import ROUTES from "./routes";


const Home = lazy(() => import("../features/home"));
const ProductManagement = lazy(() => import("../features/products/pages/addProduct"));
const CustomerManagement = lazy(() => import("../features/customer/pages/customer"));
const InventoryManagement = lazy(() => import("../features/inventoryManagement/pages/inventory"));
const Dashboard = lazy(() => import("../features/dashboard/pages/analytics"));

export const restrictedRoutes = [
    { path: ROUTES.HOME, element: <Home /> },
    { path: ROUTES.PRODUCT_MANAGEMENT, element: <ProductManagement /> },
    { path: ROUTES.CUSTOMER_MANAGEMENT, element: <CustomerManagement /> },
    { path: ROUTES.INVENTORY_MANAGEMENT, element: <InventoryManagement /> },
    { path: ROUTES.DASHBOARD, element: <Dashboard /> },
];
 
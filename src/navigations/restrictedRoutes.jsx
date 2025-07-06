import React, { lazy } from "react";
import ROUTES from "./routes";


const Home = lazy(() => import("../features/home"));
// product
const AddProduct = lazy(() => import("../features/products/pages/addProduct"));
const ViewProducts = lazy(() => import("../features/products/pages/viewProducts"));
const EditProduct = lazy(() => import("../features/products/pages/editProduct"));
// customer
const CustomerManagement = lazy(() => import("../features/customer/pages/customer"));

// inventory
const InventoryManagement = lazy(() => import("../features/inventoryManagement/pages/inventory"));

// dashboard
const Dashboard = lazy(() => import("../features/dashboard/pages/analytics"));

export const restrictedRoutes = [
    { path: ROUTES.HOME, element: <Home /> },
    { path: ROUTES.ADD_PRODUCT, element: <AddProduct /> },
    { path: ROUTES.VIEW_PRODUCTS, element: <ViewProducts /> },
    { path: ROUTES.EDIT_PRODUCT, element: <EditProduct /> },

    // customer
    { path: ROUTES.CUSTOMER_PROFILE, element: <CustomerManagement /> },

    // inventory
    { path: ROUTES.INVENTORY_MANAGEMENT, element: <InventoryManagement /> },

    // dashboard
    { path: ROUTES.DASHBOARD, element: <Dashboard /> },
];
 
import React, { lazy } from "react";
import ROUTES from "./routes";


const Home = lazy(() => import("../features/home"));
// product
const AddProduct = lazy(() => import("../features/products/pages/addProduct"));
const ViewProducts = lazy(() => import("../features/products/pages/viewProducts"));
const EditProduct = lazy(() => import("../features/products/pages/editProduct"));
const ProductDetails = lazy(() => import("../features/products/pages/productDetails"));
const Orders = lazy(() => import("../features/products/pages/orders"));
// customer
const CustomerManagement = lazy(() => import("../features/customer/pages/customer"));
const CustomerViewProfile = lazy(() => import("../features/customer/pages/customerViewProfile"));

// inventory
const InventoryManagement = lazy(() => import("../features/inventoryManagement/pages/inventory"));

// dashboard
const Dashboard = lazy(() => import("../features/dashboard/pages/analytics"));

export const restrictedRoutes = [
    { path: ROUTES.HOME, element: <Home /> },

    // product
    { path: ROUTES.ADD_PRODUCT, element: <AddProduct /> },
    { path: ROUTES.VIEW_PRODUCTS, element: <ViewProducts /> },
    { path: ROUTES.EDIT_PRODUCT, element: <EditProduct /> },
    { path: ROUTES.PRODUCT_DETAILS, element: <ProductDetails /> },
    { path: ROUTES.ORDERS, element: <Orders /> },

    // customer
    { path: ROUTES.CUSTOMERS, element: <CustomerManagement /> },
    { path: ROUTES.CUSTOMER_VIEW_PROFILE, element: <CustomerViewProfile /> },

    // inventory
    { path: ROUTES.INVENTORY_MANAGEMENT, element: <InventoryManagement /> },

    // dashboard
    { path: ROUTES.DASHBOARD, element: <Dashboard /> },
];
 
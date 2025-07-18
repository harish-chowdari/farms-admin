import { Bell, Download, Plus, Search, ShoppingCart, Users } from "lucide-react";
import ROUTES from "../../../navigations/routes";

const quickActions = [
    {
        id: 'add-product',
        title: 'Add Product',
        icon: Plus,
        color: 'bg-green-500',
        description: 'Add new product to inventory',
        navigateTo: ROUTES.ADD_PRODUCT
    },
    {
        id: 'view-orders',
        title: 'View Orders',
        icon: ShoppingCart,
        color: 'bg-blue-500',
        description: 'Check recent orders',
        navigateTo: ROUTES.ORDERS || '/orders'
    },
    {
        id: 'view-customers',
        title: 'View Customers',
        icon: Users,
        color: 'bg-gray-500',
        description: 'View and manage customers',
        navigateTo: ROUTES.CUSTOMERS
    },
    {
        id: 'reports',
        title: 'Reports',
        icon: Download,
        color: 'bg-purple-500',
        description: 'Generate reports',
        navigateTo: ROUTES.DASHBOARD
    },
    // {
    //     id: 'notifications',
    //     title: 'Notifications',
    //     icon: Bell,
    //     color: 'bg-yellow-500',
    //     description: 'View system alerts',
    //     navigateTo: ROUTES.NOTIFICATIONS || '/notifications'
    // },
    // {
    //     id: 'search',
    //     title: 'Search',
    //     icon: Search,
    //     color: 'bg-indigo-500',
    //     description: 'Search products & customers',
    //     navigateTo: ROUTES.SEARCH || '/search'
    // }
];

export { quickActions };
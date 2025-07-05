import { BarChart3, Home, Package, Settings, ShoppingCart, Sprout, Users } from "lucide-react";

const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, navigateTo: '/dashboard' },
    { id: 'inventory', label: 'Inventory', icon: Package, navigateTo: '/inventory' },
    { id: 'orders', label: 'Order Management', icon: ShoppingCart, navigateTo: '/orders' },
    { id: 'users', label: 'User Management', icon: Users, navigateTo: '/users' },
];

const sidebarHeading = "Product Management";

export { sidebarItems, sidebarHeading };
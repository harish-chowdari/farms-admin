import { BarChart3, Home, Package, Settings, ShoppingCart, Sprout, Users } from "lucide-react";

const sidebarItems = [
    { id: 'Inventory', label: 'Inventory', icon: Home, navigateTo: '/product-management' },
    { id: 'inventory', label: 'Inventory', icon: Package, navigateTo: '/inventory' },
    { id: 'orders', label: 'Order Management', icon: ShoppingCart, navigateTo: '/orders' },
    { id: 'users', label: 'User Management', icon: Users, navigateTo: '/users' },
];

const sidebarHeading = "Product Management";

export { sidebarItems, sidebarHeading };
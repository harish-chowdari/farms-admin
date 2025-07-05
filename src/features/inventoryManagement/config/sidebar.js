import { BarChart3, Home, Package, Settings, ShoppingCart, Sprout, Users } from "lucide-react";

const sidebarItems = [
    { id: 'inventory management', label: 'Inventory Management', icon: Home, navigateTo: '/inventory-management' },
    { id: 'inventory', label: 'Inventory', icon: Package, navigateTo: '/inventory-management' },
    { id: 'orders', label: 'Stock Management', icon: ShoppingCart, navigateTo: '/inventory-management' },
];

const sidebarHeading = "Inventory Management";

export { sidebarItems, sidebarHeading };
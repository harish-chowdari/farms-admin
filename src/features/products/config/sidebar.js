import { BarChart3, Home, Package, Settings, ShoppingCart, Sprout, Users } from "lucide-react";

const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard' },
    { id: 'inventory', label: 'Inventory', icon: Package, href: '/inventory' },
    { id: 'orders', label: 'Order Management', icon: ShoppingCart, href: '/orders' },
    { id: 'users', label: 'User Management', icon: Users, href: '/users' },
    { id: 'farmers', label: 'Farmer Portal', icon: Sprout, href: '/farmers' },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, href: '/reports' },
    { id: 'settings', label: 'System Settings', icon: Settings, href: '/settings' },
];

const sidebarHeading = "Product Management";

export { sidebarItems, sidebarHeading };
import { BarChart3, Home, Package, Settings, ShoppingCart, Sprout, Users } from "lucide-react";

const sidebarItems = [
    { id: 'dashboard', label: 'Customer Profile', icon: Home, navigateTo: '/customer-profile' },
    { id: 'users', label: 'Customer Actions', icon: Users, navigateTo: '/customer-actions' },
];

const sidebarHeading = "Customer Management";

export { sidebarItems, sidebarHeading };
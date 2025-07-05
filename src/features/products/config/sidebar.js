import { BarChart3, Home, Package, Settings, ShoppingCart, Sprout, Users } from "lucide-react";

const sidebarItems = [
    { id: 'add product', label: 'Add Product', icon: Home, navigateTo: '/product-management/add-product' },
    { id: 'view products', label: 'View Products', icon: Package, navigateTo: '/product-management/view-products' },
    { id: 'orders', label: 'Order Management', icon: ShoppingCart, navigateTo: '/product-management/orders' },
];

const sidebarHeading = "Product Management";

export { sidebarItems, sidebarHeading };
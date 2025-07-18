import { Home, Package, ShoppingCart } from "lucide-react";
import ROUTES from "../../../navigations/routes";

const sidebarItems = [
    { id: 'add product', label: 'Add Product', icon: Home, navigateTo: ROUTES.ADD_PRODUCT },
    { id: 'view products', label: 'View Products', icon: Package, navigateTo: ROUTES.VIEW_PRODUCTS },
    { id: 'orders', label: 'Order Management', icon: ShoppingCart, navigateTo: ROUTES.ORDERS },
];

const sidebarHeading = "Product Management";

export { sidebarItems, sidebarHeading };
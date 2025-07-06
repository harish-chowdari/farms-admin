import { Home, User, Users } from "lucide-react";
import ROUTES from "../../../navigations/routes";

const sidebarItems = [
    { id: 'customer profile', label: 'Customer Profile', icon: User, navigateTo: ROUTES.CUSTOMER_PROFILE },
    // { id: 'users', label: 'Customer Actions', icon: Users, navigateTo: '/customer-actions' },
];

const sidebarHeading = "Customer Management";

export { sidebarItems, sidebarHeading };
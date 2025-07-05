import React, { useState } from "react";
import { BarChart3, Home, Menu, Package, Settings, ShoppingCart, Sprout, Users, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, sidebarItems = [], sidebarHeading = "Dashboard", onClose }) {
   const [activeItem, setActiveItem] = useState('dashboard');
   const navigate = useNavigate();

    const defaultSidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, navigateTo: '/dashboard' },
        { id: 'products', label: 'Products', icon: Package, navigateTo: '/products' },
        { id: 'orders', label: 'Orders', icon: ShoppingCart, navigateTo: '/orders' },
        { id: 'customers', label: 'Customers', icon: Users, navigateTo: '/customers' },
    ];

    const items = sidebarItems.length > 0 ? sidebarItems : defaultSidebarItems;

    return (
        <>
            {/* Sidebar */}
            <aside className={`
                fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gradient-to-b from-green-50 to-green-100 border-r border-green-200 z-10
                transition-all duration-300 ease-in-out flex flex-col
                ${isOpen ? 'w-64' : 'w-16'}
            `}>
                {/* Header Section */}
                <div className="flex items-center p-3 pb-2 border-b border-green-200">
                    {isOpen && (
                        <h2 className="text-lg text-nowrap font-semibold text-green-800 mr-3">
                            {sidebarHeading}
                        </h2>
                    )}
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg cursor-pointer hover:bg-green-200 transition-colors ml-auto"
                    >
                        {isOpen ? (
                            <X className="w-5  h-5 text-green-600" />
                        ) : (
                            <Menu className="w-5 h-5 text-green-600" />
                        )}
                    </button>
                </div>
                
                {/* Navigation - Conditionally scrollable */}
                <nav className={`flex-1 px-2 py-4 space-y-2 ${isOpen ? '' : ''}`}>
                    {items.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                            key={item.id}
                            onClick={() => {
                                setActiveItem(item.id)
                                navigate(item?.navigateTo);
                            }}
                            className={`
                                w-full flex items-center rounded-lg transition-all duration-200 relative group
                                ${isOpen ? 'space-x-3 px-4 py-3' : 'justify-center p-3'}
                                ${activeItem === item.id 
                                ? 'bg-green-500 text-white shadow-lg' 
                                : 'text-green-700 hover:bg-green-200 cursor-pointer hover:text-green-800'
                                }
                            `}
                            >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            {isOpen && <span className="font-medium text-nowrap">{item.label}</span>}
                            
                            {/* Tooltip for collapsed state */}
                            {!isOpen && (
                                <div className="absolute text-nowrap left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                                {item.label}
                                </div>
                            )}
                            </button>
                        );
                    })}
                </nav>
                
                {/* Footer - Only visible when sidebar is open */}
                {isOpen && (
                    <div className="p-4 border-t border-green-200">
                        <div className="bg-green-600 text-white p-3 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <Sprout className="w-5 h-5" />
                                <div>
                                    <p className="text-sm font-medium">Fresh & Natural</p>
                                    <p className="text-xs opacity-90">Farm to Table</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </aside>
        </>
    );
}
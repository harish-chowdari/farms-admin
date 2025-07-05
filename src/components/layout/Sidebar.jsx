import React, { useState } from "react";
import { BarChart3, Home, Menu, Package, Settings, ShoppingCart, Sprout, Users, X } from "lucide-react";

export default function Sidebar({ isOpen, sidebarItems = [], onClose }) {
   const [activeItem, setActiveItem] = useState('dashboard');

    const defaultSidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard' },
        { id: 'products', label: 'Products', icon: Package, href: '/products' },
        { id: 'orders', label: 'Orders', icon: ShoppingCart, href: '/orders' },
        { id: 'customers', label: 'Customers', icon: Users, href: '/customers' },
        { id: 'farmers', label: 'Farmers', icon: Sprout, href: '/farmers' },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/analytics' },
        { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
    ];

    const items = sidebarItems.length > 0 ? sidebarItems : defaultSidebarItems;

    return (
        <>
            {/* Sidebar */}
            <aside className={`
                fixed left-0 top-0 h-full bg-gradient-to-b from-green-50 to-green-100 border-r border-green-200 z-40
                transition-all duration-300 ease-in-out pt-16
                ${isOpen ? 'w-64' : 'w-16'}
            `}>
                <div className="flex flex-col h-full">    
                    <div className="flex justify-center p-4">
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-green-200 transition-colors"
                        >
                        {isOpen ? (
                            <X className="w-5 h-5 text-green-600" />
                        ) : (
                            <Menu className="w-5 h-5 text-green-600" />
                        )}
                        </button>
                    </div>
                
                    {/* Navigation */}
                    <nav className="flex-1 px-2 pb-6 space-y-2">
                        {items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                key={item.id}
                                onClick={() => setActiveItem(item.id)}
                                className={`
                                    w-full flex items-center rounded-lg transition-all duration-200 relative group
                                    ${isOpen ? 'space-x-3 px-4 py-3' : 'justify-center p-3'}
                                    ${activeItem === item.id 
                                    ? 'bg-green-500 text-white shadow-lg' 
                                    : 'text-green-700 hover:bg-green-200 hover:text-green-800'
                                    }
                                `}
                                >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                {isOpen && <span className="font-medium">{item.label}</span>}
                                
                                {/* Tooltip for collapsed state */}
                                {!isOpen && (
                                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                                    {item.label}
                                    </div>
                                )}
                                </button>
                            );
                        })}
                    </nav>
                
                    {/* Footer */}
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
                </div>
            </aside>
        </>
    );
}

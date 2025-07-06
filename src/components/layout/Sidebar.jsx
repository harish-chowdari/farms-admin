import React, { useState, useEffect } from "react";
import { Home, Menu, Package, ShoppingCart, Sprout, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, sidebarItems = [], sidebarHeading = "Dashboard", onClose }) {
   
    const [activeItem, setActiveItem] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const defaultSidebarItems = [
        { id: 'add product', label: 'Add Product', icon: Home, navigateTo: '/product-management/add-product' },
        { id: 'view products', label: 'View Products', icon: Package, navigateTo: '/product-management/view-products' },
        { id: 'orders', label: 'Order Management', icon: ShoppingCart, navigateTo: '/product-management/orders' },
    ];

    const items = sidebarItems.length > 0 ? sidebarItems : defaultSidebarItems;

    // Set active item based on current route
    useEffect(() => {
        const currentItem = items.find(item => item.navigateTo === location.pathname);
        if (currentItem) {
            setActiveItem(currentItem.id);
        }
    }, [location.pathname, items]);

    const handleItemClick = (item) => {
        // Set active item immediately
        setActiveItem(item.id);
        
        // Then navigate
        if (item.navigateTo) {
            navigate(item.navigateTo);
        }
    };

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
                
                {/* Navigation */}
                <nav className={`flex-1 px-2 py-4 space-y-2`}>
                    {items.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                            key={item.id}
                            onClick={() => handleItemClick(item)}
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
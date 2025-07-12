import React, { useState } from 'react';
import { Package, ShoppingCart, Sprout, Maximize2, Minimize2 } from 'lucide-react';

import { sidebarHeading, sidebarItems } from '../../config/sidebar';
import PageLayout from '../../../../components/layout/PageLayout';
import ProductRevenueChart from './components/ProductRevenueChart';
import ProductQuantityChart from './components/ProductQuantityChart';
import OrdersRevenueChart from './components/OrdersRevenueChart';
import OrderStatusChart from './components/OrderStatusChart';

export default function index() {
    const [expandedChart, setExpandedChart] = useState(null);

    const handleToggleExpand = (chartId) => {
        setExpandedChart(expandedChart === chartId ? null : chartId);
    };

    const charts = [
        {
            id: 'product-revenue',
            title: 'Product Revenue',
            component: <ProductRevenueChart />,
            icon: <Package className="w-5 h-5" />
        },
        {
            id: 'product-quantity',
            title: 'Product Quantity',
            component: <ProductQuantityChart />,
            icon: <ShoppingCart className="w-5 h-5" />
        },
        {
            id: 'orders-revenue',
            title: 'Orders Revenue',
            component: <OrdersRevenueChart />,
            icon: <Sprout className="w-5 h-5" />
        },
        {
            id: 'order-status',
            title: 'Order Status',
            component: <OrderStatusChart />,
            icon: <Package className="w-5 h-5" />
        }
    ];

    const getChartStyles = (chartId) => {
        const isExpanded = expandedChart === chartId;
        
        if (!expandedChart) {
            // Default 2x2 grid layout
            return {
                width: '50%',
                height: '50%'
            };
        }

        if (isExpanded) {
            // Expanded chart takes 95% width and 70vh height
            return {
                width: '95%',
                height: '70vh'
            };
        }

        // Collapsed charts logic based on position
        switch (chartId) {
            case 'product-revenue': // 1st chart (top-left)
                if (expandedChart === 'product-quantity') {
                    // When 2nd chart expands, 1st chart becomes 5% width
                    return { width: '5%', height: '70vh' };
                } else if (expandedChart === 'orders-revenue') {
                    // When 3rd chart expands, 1st chart becomes reduced height
                    return { width: '95%', height: '30vh' };
                } else if (expandedChart === 'order-status') {
                    // When 4th chart expands, 1st chart becomes 5% width and reduced height
                    return { width: '5%', height: '30vh' };
                }
                break;
                
            case 'product-quantity': // 2nd chart (top-right)
                if (expandedChart === 'product-revenue') {
                    // When 1st chart expands, 2nd chart becomes 5% width
                    return { width: '5%', height: '70vh' };
                } else if (expandedChart === 'orders-revenue') {
                    // When 3rd chart expands, 2nd chart becomes 5% width and reduced height
                    return { width: '5%', height: '30vh' };
                } else if (expandedChart === 'order-status') {
                    // When 4th chart expands, 2nd chart becomes reduced height
                    return { width: '95%', height: '30vh' };
                }
                break;
                
            case 'orders-revenue': // 3rd chart (bottom-left)
                if (expandedChart === 'product-revenue') {
                    // When 1st chart expands, 3rd chart becomes reduced height
                    return { width: '95%', height: '30vh' };
                } else if (expandedChart === 'product-quantity') {
                    // When 2nd chart expands, 3rd chart becomes 5% width and reduced height
                    return { width: '5%', height: '30vh' };
                } else if (expandedChart === 'order-status') {
                    // When 4th chart expands, 3rd chart becomes 5% width
                    return { width: '5%', height: '70vh' };
                }
                break;
                
            case 'order-status': // 4th chart (bottom-right)
                if (expandedChart === 'product-revenue') {
                    // When 1st chart expands, 4th chart becomes 5% width and reduced height
                    return { width: '5%', height: '30vh' };
                } else if (expandedChart === 'product-quantity') {
                    // When 2nd chart expands, 4th chart becomes reduced height
                    return { width: '95%', height: '30vh' };
                } else if (expandedChart === 'orders-revenue') {
                    // When 3rd chart expands, 4th chart becomes 5% width
                    return { width: '5%', height: '70vh' };
                }
                break;
        }

        return { width: '50%', height: '50%' };
    };

    return (
        <PageLayout sidebarHeading={sidebarHeading} pageHeading={'Analytics'} sidebarItems={sidebarItems}>
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-wrap w-full h-[100vh]">
                    {charts.map((chart) => {
                        const isExpanded = expandedChart === chart.id;
                        const styles = getChartStyles(chart.id);
                        
                        return (
                            <div
                                key={chart.id}
                                className="relative bg-gray-50 rounded-lg border border-gray-200 overflow-hidden transition-all duration-500 ease-in-out"
                                style={{
                                    width: styles.width,
                                    height: styles.height,
                                    minWidth: '5%',
                                    minHeight: '30vh'
                                }}
                            >
                                {/* Chart Header */}
                                <div className="flex items-center justify-between p-2 bg-white border-b border-gray-200">
                                    <div className="flex items-center gap-2">
                                        {chart.icon}
                                        <h3 className={`font-semibold text-nowrap text-gray-800 ${styles.width === '5%' ? 'text-xs' : 'text-sm'}`}>
                                            {chart.title}
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => handleToggleExpand(chart.id)}
                                        className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200"
                                        title={isExpanded ? 'Minimize' : 'Maximize'}
                                    >
                                        {isExpanded ? (
                                            <Minimize2 className="w-4 h-4 text-gray-600" />
                                        ) : (
                                            <Maximize2 className="w-4 h-4 text-gray-600" />
                                        )}
                                    </button>
                                </div>

                                {/* Chart Content */}
                                <div className="p-2 h-[100%] overflow-hidden">
                                    <div className={`h-full ${styles.width === '5%' ? 'scale-75' : ''} transition-transform duration-500`}>
                                        {chart.component}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </PageLayout>
    );
}
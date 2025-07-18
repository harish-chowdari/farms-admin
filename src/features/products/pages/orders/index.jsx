import React, { useEffect, useState } from 'react'
import { Package, Search, Filter, Eye, Download, Calendar, MapPin, CreditCard, Truck, CheckCircle, Clock, AlertCircle, Users, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';

// components
import PageLayout from '../../../../components/layout/PageLayout';
// api
import { getAllOrders, getOrdersStats } from './services/api';
// utils
import { sidebarItems } from '../../config/sidebar';
import { ORDER_STATUS } from '../../../../config/constants';
import OrderDetailsPopup from './components/OrderDetailsPopup';
import { formatDate } from '../../../../utils/dateFormatter';

export default function OrdersAdmin() {
    const [orders, setOrders] = useState([]);
    const [ordersStats, setOrdersStats] = useState({});

    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case ORDER_STATUS.PLACED:
                return 'bg-blue-100 text-blue-800';
            case ORDER_STATUS.ACCEPTED:
                return 'bg-yellow-100 text-yellow-800';
            case ORDER_STATUS.DELIVERED:
                return 'bg-green-100 text-green-800';
            case ORDER_STATUS.CANCELLED:
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case ORDER_STATUS.PLACED:
                return <Clock className="w-4 h-4" />;
            case ORDER_STATUS.ACCEPTED:
                return <AlertCircle className="w-4 h-4" />;
            case ORDER_STATUS.DELIVERED:
                return <CheckCircle className="w-4 h-4" />;
            default:
                return <Package className="w-4 h-4" />;
        }
    };

    const filterOrders = () => {
        let filtered = orders;

        if (searchTerm) {
            filtered = filtered.filter(order => 
                order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.shippingAddress.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.shippingAddress.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.orderItems.some(item => 
                    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(order => order.orderStatus === statusFilter);
        }

        setFilteredOrders(filtered);
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setIsLoading(true);
                const response = await getAllOrders();
                setOrders(response);

                const orderStatsRes = await getOrdersStats();
                setOrdersStats(orderStatsRes);
                setFilteredOrders(response);
            } catch (error) {
                console.error('API error:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchOrders();
    }, []);

    // Update filtered orders when search term or status filter changes
    useEffect(() => {
        filterOrders();
    }, [searchTerm, statusFilter, orders]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
    };

    if (isLoading) {
        return (
            <PageLayout sidebarHeading={'Orders'} sidebarItems={sidebarItems} pageHeading={'Orders'}>
                <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
                        <p className="mt-4 text-lg text-gray-600">Loading orders...</p>
                    </div>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout sidebarHeading={'Orders'} sidebarItems={sidebarItems} pageHeading={'Orders'}>
            <div className="min-h-screen bg-white">
                <div className="max-w-[1440px] mx-auto px-2 sm:px-3 lg:px-4 py-4">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                    <p className="text-2xl font-bold text-gray-900">{ordersStats?.totalOrders}</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                    <p className="text-2xl font-bold text-gray-900">₹{ordersStats?.totalRevenue}</p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Delivered</p>
                                    <p className="text-2xl font-bold text-gray-900">{ordersStats?.deliveredOrders}</p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Pending</p>
                                    <p className="text-2xl font-bold text-gray-900">{ordersStats?.pendingOrders}</p>
                                </div>
                                <div className="bg-yellow-100 p-3 rounded-lg">
                                    <Clock className="w-6 h-6 text-yellow-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search orders..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Filter className="w-4 h-4 text-gray-400" />
                                    <select
                                        value={statusFilter}
                                        onChange={handleStatusFilterChange}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="placed">Placed</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                            <div className="text-sm text-gray-600">
                                Showing {filteredOrders.length} of {orders.length} orders
                            </div>
                        </div>
                    </div>

                    {/* Orders Table */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Items
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                                {orders.length === 0 ? 'No orders found' : 'No orders match your search criteria'}
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredOrders.map((order) => (
                                            <tr 
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setShowModal(true);
                                                }}
                                                key={order._id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        #{order._id.slice(-8)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                                                            <Users className="w-4 h-4 text-green-600" />
                                                        </div>
                                                        <div className="ml-3">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {order.shippingAddress.city}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {order.shippingAddress.state}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {order.orderItems.length} items
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {order.orderItems.slice(0, 2).map(item => item.productName).join(', ')}
                                                        {order.orderItems.length > 2 && '...'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        ₹{order.totalPrice}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        +₹{order.shippingPrice} shipping
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                                                        {getStatusIcon(order.orderStatus)}
                                                        <span className="ml-1 capitalize">{order.orderStatus}</span>
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatDate(order.createdAt)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedOrder(order);
                                                            setShowModal(true);
                                                        }}
                                                        className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        <span>View</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Order Details Modal */}
                {showModal && selectedOrder && (
                    <OrderDetailsPopup 
                        getStatusColor={getStatusColor}
                        getStatusIcon={getStatusIcon}
                        selectedOrder={selectedOrder} 
                        onClose={() => setShowModal(false)} 
                    />
                )}
            </div>
        </PageLayout>
    )
}
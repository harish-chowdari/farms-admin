import React, { useEffect, useState } from 'react';
import { 
  User, 
  Package, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Truck, 
  CheckCircle, 
  Clock, 
  Star,
  Phone,
  Mail,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Award
} from 'lucide-react';
import { useParams } from 'react-router-dom';

import PageLayout from '../../../../components/layout/PageLayout';
import PrimaryLoader from '../../../../components/loaders/PrimaryLoader';

import { getCustomerOrders } from './services/api';
import { ORDER_STATUS } from '../../../../config/constants';
import { sidebarHeading, sidebarItems } from '../../config/sidebar';


export default function CustomerProfile() {

    const { customerId } = useParams();
    const [customer, setCustomer] = useState({});
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                setIsLoading(true);
                const response = await getCustomerOrders(customerId);
                setOrders(response?.orders);
                setCustomer(response?.summary);
                console.log('Orders:', response);
            } catch (error) {
                console.error('API error:', error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCustomerData();
    }, [customerId]);

    const getStatusColor = (status) => {
        switch (status) {
        case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
        case 'accepted': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'placed': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
        case ORDER_STATUS.DELIVERED: return <CheckCircle className="w-4 h-4" />;
        case ORDER_STATUS.ACCEPTED: return <Truck className="w-4 h-4" />;
        case ORDER_STATUS.PLACED: return <Clock className="w-4 h-4" />;
        default: return <Package className="w-4 h-4" />;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
        });
    };

    const stats = [
        { label: 'Total Orders', value: customer?.totalOrders, icon: ShoppingBag, color: 'bg-blue-500' },
        { label: 'Total Spent', value: customer?.totalSpent, icon: DollarSign, color: 'bg-green-500' },
        { label: 'Avg Order Value', value: `₹${orders.length ? (orders?.reduce((sum, order) => sum + order?.totalPrice, 0) / orders?.length)?.toFixed(2) : 0}`, icon: TrendingUp, color: 'bg-purple-500' },
        { label: 'Customer Since', value: customer?.joinedOn ? formatDate(customer?.joinedOn) : 'N/A', icon: Calendar, color: 'bg-orange-500' }
    ];

    return (
        <PageLayout sidebarHeading={sidebarHeading} sidebarItems={sidebarItems} pageHeading={'Customer Profile'}>
        <PrimaryLoader isLoading={isLoading} />

        <div className="p-4 bg-white min-h-screen">
        {/* Header */}
        <div className="md:mb-6 mb-3">
            <p className="text-gray-600">Complete overview of customer data and order history</p>
        </div>

        {/* Customer Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-start space-x-6">
            <div className="relative">
                <img 
                src={'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'} 
                alt={customer.userName}
                className="w-24 h-24 rounded-2xl object-cover"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
            </div>
            
            <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{customer?.userName}</h2>
                <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full flex items-center space-x-1">
                    <Award className="w-3 h-3" />
                    <span>{customer.status}</span>
                </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {customer?.email && <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{customer?.email}</span>
                </div>}
                <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{customer?.phoneNo}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Enikepadu, Vijayawada</span>
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
            ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
                {['overview', 'orders', 'address'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent cursor-pointer text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {tab}
                </button>
                ))}
            </div>
            </div>

            <div className="p-6">
            {activeTab === 'overview' && (
                <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Order delivered successfully</span>
                        <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
                        </div>
                        <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Order accepted and processing</span>
                        <span className="text-xs text-gray-400 ml-auto">1 day ago</span>
                        </div>
                        <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">New order placed</span>
                        <span className="text-xs text-gray-400 ml-auto">2 days ago</span>
                        </div>
                    </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Preferences</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Preferred Payment</span>
                        <span className="text-sm font-medium text-gray-900">Credit Card</span>
                        </div>
                        <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Delivery Preference</span>
                        <span className="text-sm font-medium text-gray-900">Standard</span>
                        </div>
                        <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Favorite Category</span>
                        <span className="text-sm font-medium text-gray-900">Organic Vegetables</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            )}

            {activeTab === 'orders' && (
                <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order._id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                        <Package className="w-5 h-5 text-gray-400" />
                        <h3 className="font-semibold text-gray-900">Order #{order._id.slice(-8)}</h3>
                        </div>
                        <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(order.orderStatus)}`}>
                            {getStatusIcon(order?.orderStatus)}
                            <span className="capitalize">{order?.orderStatus}</span>
                        </span>
                        <span className="text-sm text-gray-500">{formatDate(order.createdAt)}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                        <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                        <div className="space-y-3">
                            {order.orderItems.map((item) => (
                            <div key={item._id} className="flex items-center space-x-3">
                                <img 
                                src={item.productImage} 
                                alt={item.productName}
                                className="w-12 h-12 border border-gray-300 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                <h5 className="font-medium text-gray-900 text-sm">{item.productName}</h5>
                                <p className="text-xs text-gray-500">
                                    Qty: {item.quantity} × <span className='line-through'>₹{item.price}</span> 
                                    {item.discountPrice > 0 && (
                                    <span className="text-green-600 ml-2">₹{item.discountPrice}</span>
                                    )}
                                </p>
                                </div>
                            </div>
                            ))}
                        </div>
                        </div>

                        <div>
                        <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="text-gray-900">₹{order.totalPrice - order.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between">
                            <span className="text-gray-600">Shipping:</span>
                            <span className="text-gray-900">₹{order.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between font-medium text-base border-t pt-2">
                            <span>Total:</span>
                            <span>₹{order.totalPrice}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-3">
                            <CreditCard className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{order.paymentMethod}</span>
                            {order.isPaid && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            )}

            {activeTab === 'address' && (
                <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <h3 className="font-semibold text-gray-900">Primary Shipping Address</h3>
                    </div>
                    <div className="text-gray-600">
                    <p className="font-medium text-gray-900 mb-1">John Smith</p>
                    <p>123 Green Farm Road</p>
                    <p>Greenville, Farmington 123456</p>
                    <p>Wonderland</p>
                    </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="font-semibold text-gray-900 mb-3">Address Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{orders.length}</div>
                        <div className="text-sm text-gray-600">Deliveries to this address</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                        {orders.filter(o => o.orderStatus === 'delivered').length}
                        </div>
                        <div className="text-sm text-gray-600">Successfully delivered</div>
                    </div>
                    </div>
                </div>
                </div>
            )}
            </div>
        </div>
        </div>
        </PageLayout>
    );
}
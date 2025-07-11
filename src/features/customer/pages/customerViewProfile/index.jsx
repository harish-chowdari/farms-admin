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
import { sidebarHeading, sidebarItems } from '../../config/sidebar';

// Mock data based on your JSON structure
const mockCustomerData = {
  _id: "64ab3c2f9d1e8f00123abcd4",
  name: "John Smith",
  email: "john.smith@email.com",
  phone: "+1 (555) 123-4567",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  joinDate: "2024-01-15",
  totalOrders: 5,
  totalSpent: 625,
  status: "Premium Customer",
  lastOrderDate: "2025-07-10"
};

const mockOrders = [
  {
    "shippingAddress": {
      "address": "123 Green Farm Road",
      "city": "Greenville",
      "state": "Farmington",
      "postalCode": "123456",
      "country": "Wonderland"
    },
    "_id": "686e689fcf5cf5f7b860acaa",
    "userId": "64ab3c2f9d1e8f00123abcd4",
    "orderItems": [
      {
        "productId": "64ab3c3e9d1e8f00123abcd5",
        "productName": "Fresh Tomatoes (1kg)",
        "productImage": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100&h=100&fit=crop",
        "price": 40,
        "discountPrice": 5,
        "weight": 1,
        "weightUnit": "kg",
        "quantity": 2,
        "_id": "686e689fcf5cf5f7b860acab"
      },
      {
        "productId": "64ab3c4b9d1e8f00123abcd6",
        "productName": "Organic Spinach (500g)",
        "productImage": "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&h=100&fit=crop",
        "price": 30,
        "discountPrice": 0,
        "weight": 500,
        "weightUnit": "g",
        "quantity": 1,
        "_id": "686e689fcf5cf5f7b860acac"
      }
    ],
    "paymentMethod": "Credit Card",
    "shippingPrice": 20,
    "totalPrice": 125,
    "isPaid": true,
    "paidAt": "2025-07-09T09:15:00.000Z",
    "isDelivered": false,
    "deliveredAt": null,
    "createdAt": "2025-07-09T13:03:27.257Z",
    "updatedAt": "2025-07-10T07:54:40.805Z",
    "__v": 0,
    "orderStatus": "accepted"
  },
  {
    "shippingAddress": {
      "address": "123 Green Farm Road",
      "city": "Greenville",
      "state": "Farmington",
      "postalCode": "123456",
      "country": "Wonderland"
    },
    "orderStatus": "placed",
    "_id": "686e68abcf5cf5f7b860acae",
    "userId": "64ab3c2f9d1e8f00123abcd4",
    "orderItems": [
      {
        "productId": "64ab3c3e9d1e8f00123abcd5",
        "productName": "Fresh Carrot",
        "productImage": "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=100&h=100&fit=crop",
        "price": 40,
        "discountPrice": 5,
        "weight": 1,
        "weightUnit": "kg",
        "quantity": 2,
        "_id": "686e68abcf5cf5f7b860acaf"
      },
      {
        "productId": "64ab3c4b9d1e8f00123abcd6",
        "productName": "Organic Spinach (500g)",
        "productImage": "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&h=100&fit=crop",
        "price": 30,
        "discountPrice": 0,
        "weight": 500,
        "weightUnit": "g",
        "quantity": 1,
        "_id": "686e68abcf5cf5f7b860acb0"
      }
    ],
    "paymentMethod": "Credit Card",
    "shippingPrice": 20,
    "totalPrice": 125,
    "isPaid": true,
    "paidAt": "2025-07-09T09:15:00.000Z",
    "isDelivered": false,
    "deliveredAt": null,
    "createdAt": "2025-07-09T13:03:39.751Z",
    "updatedAt": "2025-07-09T13:03:39.751Z",
    "__v": 0
  },
  {
    "shippingAddress": {
      "address": "123 Green Farm Road",
      "city": "Greenville",
      "state": "Farmington",
      "postalCode": "123456",
      "country": "Wonderland"
    },
    "_id": "686e68b4cf5cf5f7b860acb2",
    "userId": "64ab3c2f9d1e8f00123abcd4",
    "orderItems": [
      {
        "productId": "64ab3c3e9d1e8f00123abcd5",
        "productName": "Fresh Potato",
        "productImage": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop",
        "price": 40,
        "discountPrice": 5,
        "weight": 1,
        "weightUnit": "kg",
        "quantity": 2,
        "_id": "686e68b4cf5cf5f7b860acb3"
      },
      {
        "productId": "64ab3c4b9d1e8f00123abcd6",
        "productName": "Organic Spinach (500g)",
        "productImage": "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&h=100&fit=crop",
        "price": 30,
        "discountPrice": 0,
        "weight": 500,
        "weightUnit": "g",
        "quantity": 1,
        "_id": "686e68b4cf5cf5f7b860acb4"
      }
    ],
    "paymentMethod": "Credit Card",
    "shippingPrice": 20,
    "totalPrice": 125,
    "isPaid": true,
    "paidAt": "2025-07-09T09:15:00.000Z",
    "isDelivered": true,
    "deliveredAt": "2025-07-10T07:55:15.263Z",
    "createdAt": "2025-07-09T13:03:48.085Z",
    "updatedAt": "2025-07-10T07:55:15.263Z",
    "__v": 0,
    "orderStatus": "delivered"
  }
];

export default function CustomerProfile() {

    const { customerId } = useParams();
    const [customer, setCustomer] = useState(mockCustomerData);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchCustomerData = async () => {
        try {
            // Replace with actual API call
            // const response = await getCustomerOrders(customerId);
            setOrders(mockOrders);
            setLoading(false);
        } catch (error) {
            console.error('API error:', error);
            setLoading(false);
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
        case 'delivered': return <CheckCircle className="w-4 h-4" />;
        case 'accepted': return <Truck className="w-4 h-4" />;
        case 'placed': return <Clock className="w-4 h-4" />;
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
        { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'bg-blue-500' },
        { label: 'Total Spent', value: `$${orders.reduce((sum, order) => sum + order.totalPrice, 0)}`, icon: DollarSign, color: 'bg-green-500' },
        { label: 'Avg Order Value', value: `$${orders.length ? (orders.reduce((sum, order) => sum + order.totalPrice, 0) / orders.length).toFixed(2) : 0}`, icon: TrendingUp, color: 'bg-purple-500' },
        { label: 'Customer Since', value: formatDate(customer.joinDate), icon: Calendar, color: 'bg-orange-500' }
    ];

    if (loading) {
        return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        </div>
        );
    }

    return (
        <PageLayout sidebarHeading={sidebarHeading} sidebarItems={sidebarItems} pageHeading={'Customer Data'}>

        <div className="p-4 bg-white min-h-screen">
        {/* Header */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Profile</h1>
            <p className="text-gray-600">Complete overview of customer data and order history</p>
        </div>

        {/* Customer Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-start space-x-6">
            <div className="relative">
                <img 
                src={customer.avatar} 
                alt={customer.name}
                className="w-24 h-24 rounded-2xl object-cover"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
            </div>
            
            <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{customer.name}</h2>
                <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full flex items-center space-x-1">
                    <Award className="w-3 h-3" />
                    <span>{customer.status}</span>
                </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{customer.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{customer.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Greenville, Farmington</span>
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
                        : 'border-transparent text-gray-500 hover:text-gray-700'
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
                            {getStatusIcon(order.orderStatus)}
                            <span className="capitalize">{order.orderStatus}</span>
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
                                className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                <h5 className="font-medium text-gray-900 text-sm">{item.productName}</h5>
                                <p className="text-xs text-gray-500">
                                    Qty: {item.quantity} × ${item.price} 
                                    {item.discountPrice > 0 && (
                                    <span className="text-green-600 ml-2">(-${item.discountPrice})</span>
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
                            <span className="text-gray-900">${order.totalPrice - order.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between">
                            <span className="text-gray-600">Shipping:</span>
                            <span className="text-gray-900">${order.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between font-medium text-base border-t pt-2">
                            <span>Total:</span>
                            <span>${order.totalPrice}</span>
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
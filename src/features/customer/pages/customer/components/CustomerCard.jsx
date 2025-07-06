import React from 'react'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  Calendar, 
  Star, 
  Search,
  Filter,
  MoreVertical,
  Edit,
  Ban,
  Eye,
  Package,
  Sprout
} from 'lucide-react';

export default function CustomerCard({customer}) {

    const getStatusColor = (status) => {
    switch (status) {
      case 'premium': return 'bg-gradient-to-r from-amber-400 to-orange-500 text-white';
      case 'active': return 'bg-gradient-to-r from-emerald-400 to-green-500 text-white';
      case 'new': return 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white';
      case 'inactive': return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
    // Sample customer data for demonstration
    const sampleCustomer = {
        name: "Sarah Johnson",
        avatar: "SJ",
        status: "premium",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        location: "New York, NY",
        totalOrders: 24,
        totalSpent: "$2,450",
        rating: 4.8,
        orderFrequency: "Weekly",
        lastOrder: "2 days ago",
        joinDate: "Jan 2023"
    };

    const displayCustomer = customer || sampleCustomer;
  
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group">
            <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-md">
                        {displayCustomer.avatar}
                        </div>
                        <div>
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {displayCustomer.name}
                        </h3>
                        {/* <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(displayCustomer.status)} mt-1`}>
                            {displayCustomer.status.toUpperCase()}
                        </span> */}
                        </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                            <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-5">
                    <div className="flex items-center space-x-3 text-gray-600">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{displayCustomer.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                        <Phone className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{displayCustomer.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="text-sm">{displayCustomer.location}</span>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-blue-50 p-3 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                        <div className="flex items-center space-x-2">
                            <ShoppingBag className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="text-xs text-blue-600 font-medium">Total Orders</p>
                                <p className="text-lg font-bold text-blue-800">{displayCustomer.totalOrders}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-green-50 p-3 py-2 rounded-lg hover:bg-green-100 transition-colors">
                        <div className="flex items-center space-x-2">
                            <Package className="w-5 h-5 text-green-600" />
                            <div>
                                <p className="text-xs text-green-600 font-medium">Total Spent</p>
                                <p className="text-lg font-bold text-green-800">{displayCustomer.totalSpent}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rating and Frequency */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{displayCustomer.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                        Orders: {displayCustomer.orderFrequency}
                    </div>
                </div>

                {/* Dates */}
                <div className="flex justify-between text-xs text-gray-500 mb-5">
                    <span>Last Order: {displayCustomer.lastOrder}</span>
                    <span>Joined: {displayCustomer.joinDate}</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                    <button className="flex-1 cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-1 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md">
                        <Eye className="w-4 h-4" />
                        <span className="font-medium">View Profile</span>
                    </button>
                    <button className="px-4 cursor-pointer py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200">
                        <Ban className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
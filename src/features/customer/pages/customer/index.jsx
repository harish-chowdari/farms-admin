import React, { useState } from 'react';
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
import CustomerCard from './components/CustomerCard';
import PageLayout from '../../../../components/layout/PageLayout';
import { sidebarHeading, sidebarItems } from '../../config/sidebar';

const CustomerProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Mock customer data
  const customers = [
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya.sharma@gmail.com",
      phone: "+91 9876543210",
      location: "Bangalore, Karnataka",
      totalOrders: 24,
      totalSpent: "₹12,450",
      lastOrder: "2024-07-04",
      joinDate: "2024-01-15",
      status: "active",
      avatar: "PS",
      favoriteProducts: ["Organic Tomatoes", "Fresh Spinach", "Farm Eggs"],
      rating: 4.8,
      orderFrequency: "Weekly"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      email: "rajesh.k@yahoo.com",
      phone: "+91 9123456789",
      location: "Mumbai, Maharashtra",
      totalOrders: 18,
      totalSpent: "₹8,900",
      lastOrder: "2024-07-02",
      joinDate: "2024-02-10",
      status: "active",
      avatar: "RK",
      favoriteProducts: ["Organic Apples", "Basmati Rice", "Paneer"],
      rating: 4.6,
      orderFrequency: "Bi-weekly"
    },
    {
      id: 3,
      name: "Anita Patel",
      email: "anita.patel@hotmail.com",
      phone: "+91 9345678901",
      location: "Pune, Maharashtra",
      totalOrders: 31,
      totalSpent: "₹15,200",
      lastOrder: "2024-07-05",
      joinDate: "2023-12-05",
      status: "premium",
      avatar: "AP",
      favoriteProducts: ["Organic Vegetables", "Fresh Fruits", "Dairy Products"],
      rating: 4.9,
      orderFrequency: "3x per week"
    },
    {
      id: 4,
      name: "Suresh Reddy",
      email: "suresh.reddy@gmail.com",
      phone: "+91 9567890123",
      location: "Hyderabad, Telangana",
      totalOrders: 7,
      totalSpent: "₹3,200",
      lastOrder: "2024-06-28",
      joinDate: "2024-05-20",
      status: "new",
      avatar: "SR",
      favoriteProducts: ["Green Leafy Vegetables", "Organic Rice"],
      rating: 4.4,
      orderFrequency: "Monthly"
    },
    {
      id: 5,
      name: "Meera Krishnan",
      email: "meera.k@outlook.com",
      phone: "+91 9789012345",
      location: "Chennai, Tamil Nadu",
      totalOrders: 45,
      totalSpent: "₹22,800",
      lastOrder: "2024-07-06",
      joinDate: "2023-11-08",
      status: "premium",
      avatar: "MK",
      favoriteProducts: ["Organic Spices", "Fresh Coconut", "Curry Leaves"],
      rating: 4.7,
      orderFrequency: "Daily"
    },
    {
      id: 6,
      name: "Amit Singh",
      email: "amit.singh@gmail.com",
      phone: "+91 9901234567",
      location: "Delhi, NCR",
      totalOrders: 2,
      totalSpent: "₹890",
      lastOrder: "2024-05-15",
      joinDate: "2024-05-10",
      status: "inactive",
      avatar: "AS",
      favoriteProducts: ["Organic Milk", "Wheat Flour"],
      rating: 4.2,
      orderFrequency: "Rarely"
    }
  ];

  

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm);
        
        const matchesFilter = filterStatus === 'all' || customer.status === filterStatus;
        return matchesSearch && matchesFilter;
    });


  return (
    <PageLayout sidebarHeading={sidebarHeading} sidebarItems={sidebarItems} pageHeading={'Customer Profiles'}>
        <div className="p-3 bg-white min-h-screen">
            <div className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Customers</p>
                            <p className="text-2xl font-bold text-gray-800">{customers.length}</p>
                        </div>
                        </div>
                    </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <Sprout className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Active Customers</p>
                        <p className="text-2xl font-bold text-gray-800">{customers.filter(c => c.status === 'active').length}</p>
                    </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <ShoppingBag className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">New Customers</p>
                        <p className="text-2xl font-bold text-gray-800">{customers.filter(c => c.status === 'new').length}</p>
                    </div>
                    </div>
                </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                        type="text"
                        placeholder="Search customers by name, email, or phone..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                        className="pl-10 pr-8 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="premium">Premium</option>
                        <option value="new">New</option>
                        <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Customer Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCustomers.map((customer) => (
                    <CustomerCard key={customer.id} customer={customer} />
                ))}
            </div>

            {/* Empty State */}
            {filteredCustomers.length === 0 && (
                <div className="text-center py-12">
                    <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No customers found matching your search criteria.</p>
                </div>
            )}
        </div>
    </PageLayout>
  );
};

export default CustomerProfiles;
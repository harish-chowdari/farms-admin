import React, { useEffect, useState } from 'react'; 
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
import { getUsersOrderSummary } from './services/api'; 
 
const CustomerProfiles = () => { 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [filterStatus, setFilterStatus] = useState('all'); 
    const [selectedCustomer, setSelectedCustomer] = useState(null); 
 
    const [customers, setCustomers] = useState([]); 
    const [ordersSummary, setOrdersSummary] = useState([]); 
    const [customersData, setCustomersData] = useState([]);

    const getOrderFrequency = (orderData) => {
        if (!orderData) return 'Never';
        
        const { totalOrders, lastOrderDate } = orderData;
        const firstOrderDate = new Date(lastOrderDate);
        const now = new Date();
        const daysSinceJoin = (now - firstOrderDate) / (1000 * 60 * 60 * 24);
        
        if (totalOrders === 0) return 'Never';
        if (totalOrders === 1) return 'Once';
        
        const avgDaysBetweenOrders = daysSinceJoin / totalOrders;
        
        if (avgDaysBetweenOrders <= 3) return 'Daily';
        if (avgDaysBetweenOrders <= 10) return 'Weekly';
        if (avgDaysBetweenOrders <= 21) return 'Bi-weekly';
        if (avgDaysBetweenOrders <= 35) return 'Monthly';
        return 'Rarely';
    };

    useEffect(() => { 
        const fetchCustomerData = async () => { 
            try { 
                const res = await getUsersOrderSummary(); 
                    setCustomersData(res);
            } catch (error) { 
                console.error('API error:', error); 
            } 
        } 
        fetchCustomerData(); 
    }, []); 
   
    const filteredCustomers = customersData.filter(customer => { 
        const matchesSearch = customer?.userName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
            customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
            customer?.phone?.includes(searchTerm); 
         
        const matchesFilter = filterStatus === 'all' || customer?.status === filterStatus; 
        return matchesSearch && matchesFilter; 
    }); 

    const totalCustomers = customersData.length;
    const activeCustomers = customersData.filter(c => c.status === 'active').length;
    const newCustomers = customersData.filter(c => c.status === 'new').length;
 
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
                                <p className="text-2xl font-bold text-gray-800">{totalCustomers}</p> 
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
                                <p className="text-2xl font-bold text-gray-800">{activeCustomers}</p> 
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
                                <p className="text-2xl font-bold text-gray-800">{newCustomers}</p> 
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
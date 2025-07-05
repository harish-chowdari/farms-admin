import React, { useState } from 'react';
import { 
    Package, 
    Users, 
    Calendar,
    Sprout
} from 'lucide-react';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';

const ManagementCard = ({ title, description, icon: Icon, color, details }) => {
    return (
        <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-${color}-100`}>
            {/* Header */}
            <div className={`bg-gradient-to-r from-${color}-500 to-${color}-600 p-6 text-white`}>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold">{title}</h3>
                        <p className="text-sm opacity-90 mt-1">{description}</p>
                    </div>
                    <div className={`bg-white bg-opacity-20 p-3 rounded-full`}>
                        <Icon className="w-8 h-8" />
                    </div>
                </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                    {details}
                </p>
            </div>
        </div>
    );
};

export default function index() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-25 to-green-50">
            { <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />}
            
            {/* Main Content */}
            <main className={`
                pt-16 transition-all duration-300 ease-in-out min-h-screen
            `}>
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 m-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Welcome to Sunotal Farms Admin</h1>
                            <p className="text-green-100 text-lg">
                                Manage your farm-to-table business with ease and efficiency
                            </p>
                            <div className="flex items-center space-x-4 mt-4">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-5 h-5" />
                                    <span>Today: {new Date().toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Sprout className="w-5 h-5" />
                                    <span>Fresh • Natural • Sustainable</span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="bg-white bg-opacity-20 p-6 rounded-full">
                                <Sprout className="w-16 h-16" />
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Management Cards */}
                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <ManagementCard
                            title="Product Management"
                            description="Manage your farm fresh products and inventory"
                            icon={Package}
                            color="green"
                            details="Manage products, track inventory levels, update product information, monitor stock status, and handle order fulfillment efficiently."
                        />
                        
                        <ManagementCard
                            title="Customer Management"
                            description="Connect with your customers and build relationships"
                            icon={Users}
                            color="blue"
                            details="Manage customer profiles, track purchase history, handle customer inquiries, send communications, and build lasting relationships."
                        />
                    </div>
                </div>
            </main>
            
            {Footer && <Footer />}
        </div>
    );
}
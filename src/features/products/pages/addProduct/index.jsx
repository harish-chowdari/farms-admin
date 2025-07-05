import React from 'react'
import { Package, ShoppingCart, Sprout } from 'lucide-react';

import PageLayout from '../../../../components/layout/PageLayout';
import { sidebarHeading, sidebarItems } from '../../config/sidebar';

export default function index() {
    return (
        <PageLayout sidebarHeading={sidebarHeading} sidebarItems={sidebarItems}>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Welcome to Sunotal Farms Admin</h2>
              <p className="text-green-600 mb-6">
                Manage your farm-to-table business with our comprehensive admin dashboard.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-green-800">Total Orders</h3>
                    <ShoppingCart className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-700">1,234</p>
                  <p className="text-sm text-green-600">↗ 12% from last month</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-blue-800">Active Products</h3>
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-700">456</p>
                  <p className="text-sm text-blue-600">↗ 8% from last month</p>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-yellow-800">Partner Farmers</h3>
                    <Sprout className="w-6 h-6 text-yellow-600" />
                  </div>
                  <p className="text-2xl font-bold text-yellow-700">89</p>
                  <p className="text-sm text-yellow-600">↗ 5% from last month</p>
                </div>
              </div>
            </div>
        </PageLayout>
    )

}

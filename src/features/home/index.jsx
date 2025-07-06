import React, { useState } from 'react';
import { Users, Package, BarChart3, Warehouse, Plus, Eye, Edit, TrendingUp, ShoppingCart, UserCheck, AlertTriangle, Sprout, Search, Bell, User, ArrowRight, ExternalLink, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import ROUTES from '../../navigations/routes';

const AdminDashboard = () => {
	const [activeCard, setActiveCard] = useState(null);
    const navigate = useNavigate();

	const dashboardStats = {
		totalCustomers: 1247,
		totalProducts: 89,
		lowStockItems: 12,
		todaySales: 45230
	};

	const cards = [
		{
			id: 'products',
			title: 'Product Management',
			icon: Package,
			color: 'from-green-500 to-green-600',
			stats: [
				{ label: 'Total Products', value: dashboardStats.totalProducts, icon: Package },
				{ label: 'Categories', value: 8, icon: BarChart3 },
				{ label: 'Out of Stock', value: 5, icon: AlertTriangle }
			],
			actions: ['Add New Product', 'Manage Categories', 'Bulk Import'],
            navigateTo: ROUTES.ADD_PRODUCT
		},
		{
			id: 'customers',
			title: 'Customer Management',
			icon: Users,
			color: 'from-blue-500 to-blue-600',
			stats: [
				{ label: 'Total Customers', value: dashboardStats.totalCustomers, icon: UserCheck },
				{ label: 'New This Month', value: 156, icon: TrendingUp },
				{ label: 'Active Orders', value: 23, icon: ShoppingCart }
			],
			actions: ['View All Customers', 'Customer Analytics', 'Support Tickets'],
            navigateTo: ROUTES.CUSTOMER_PROFILE
		},
		{
			id: 'inventory',
			title: 'Inventory Management',
			icon: Warehouse,
			color: 'from-orange-500 to-orange-600',
			stats: [
				{ label: 'Total Stock Value', value: '₹2.4L', icon: BarChart3 },
				{ label: 'Low Stock Alerts', value: dashboardStats.lowStockItems, icon: AlertTriangle },
				{ label: 'Reorder Required', value: 8, icon: Package }
			],
			actions: ['Update Stock', 'Set Alerts', 'Supplier Management'],
            navigateTo: ROUTES.INVENTORY_MANAGEMENT
		},
		{
			id: 'dashboard',
			title: 'Dashboard Analytics',
			icon: BarChart3,
			color: 'from-purple-500 to-purple-600',
			stats: [
				{ label: 'Today\'s Sales', value: `₹${(dashboardStats.todaySales / 1000).toFixed(1)}K`, icon: TrendingUp },
				{ label: 'Monthly Revenue', value: '₹8.2L', icon: BarChart3 },
				{ label: 'Growth Rate', value: '+12%', icon: TrendingUp }
			],
			actions: ['Sales Report', 'Customer Insights', 'Export Data'],
            navigateTo: ROUTES.DASHBOARD   
		}
	];

	return (
		<div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
			{/* Header - Fixed at top */}
			<Header />

			{/* Main Content Area - Scrollable */}
			<div className="flex-1 overflow-y-auto">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					{/* Quick Stats Banner */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
						<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-600 mb-1">Total Customers</p>
									<p className="text-2xl font-bold text-gray-900">{dashboardStats.totalCustomers}</p>
								</div>
								<div className="bg-blue-100 p-3 rounded-lg">
									<Users className="w-6 h-6 text-blue-600" />
								</div>
							</div>
						</div>
						<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-600 mb-1">Products</p>
									<p className="text-2xl font-bold text-gray-900">{dashboardStats.totalProducts}</p>
								</div>
								<div className="bg-green-100 p-3 rounded-lg">
									<Package className="w-6 h-6 text-green-600" />
								</div>
							</div>
						</div>
						<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-600 mb-1">Low Stock</p>
									<p className="text-2xl font-bold text-red-600">{dashboardStats.lowStockItems}</p>
								</div>
								<div className="bg-red-100 p-3 rounded-lg">
									<AlertTriangle className="w-6 h-6 text-red-600" />
								</div>
							</div>
						</div>
						<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-600 mb-1">Today's Sales</p>
									<p className="text-2xl font-bold text-gray-900">₹{(dashboardStats.todaySales / 1000).toFixed(1)}K</p>
								</div>
								<div className="bg-purple-100 p-3 rounded-lg">
									<TrendingUp className="w-6 h-6 text-purple-600" />
								</div>
							</div>
						</div>
					</div>

					{/* Main Management Cards */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{cards.map((card) => {
							const IconComponent = card.icon;
							return (
								<div
									key={card.id}
									className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer relative group ${
										activeCard === card.id ? 'ring-2 ring-blue-500' : ''
									}`}
									onClick={() => navigate(card?.navigateTo)}
								>
									{/* Card Header */}
									<div className={`bg-gradient-to-r ${card.color} p-6 text-white`}>
										<div className="flex items-center justify-between">
											<div>
												<h3 className="text-xl font-bold">{card.title}</h3>
												<p className="text-white/80 mt-1">Manage and monitor</p>
											</div>
											<div className="bg-white/20 p-3 rounded-lg">
												<IconComponent className="w-8 h-8" />
											</div>
										</div>
									</div>

									{/* Card Content */}
									<div className="p-6">
										{/* Stats Grid */}
										<div className="grid grid-cols-3 gap-4 mb-6">
											{card.stats.map((stat, index) => {
												const StatIcon = stat.icon;
												return (
													<div key={index} className="text-center">
														<div className="bg-gray-50 rounded-lg p-3 mb-2">
															<StatIcon className="w-5 h-5 text-gray-600 mx-auto mb-1" />
															<p className="text-lg font-bold text-gray-900">{stat.value}</p>
														</div>
														<p className="text-xs text-gray-600">{stat.label}</p>
													</div>
												);
											})}
										</div>
									</div>

									{/* Hover Overlay */}
									<div onClick={() => navigate(card?.navigateTo)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
										<div className="text-center text-white">
											<div className="bg-white/20 p-4 rounded-full mb-3 mx-auto w-16 h-16 flex items-center justify-center">
												<ExternalLink className="w-8 h-8" />
											</div>
											<p className="text-lg font-semibold mb-1">Open {card.title}</p>
											<p className="text-sm text-white/80">Click to navigate</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{/* Recent Activity */}
					<div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
						<div className="space-y-3">
							<div className="flex items-center space-x-3 py-2">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-gray-600">New customer registered: John Doe</span>
								<span className="text-xs text-gray-400">2 minutes ago</span>
							</div>
							<div className="flex items-center space-x-3 py-2">
								<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
								<span className="text-gray-600">Product added: Organic Tomatoes</span>
								<span className="text-xs text-gray-400">5 minutes ago</span>
							</div>
							<div className="flex items-center space-x-3 py-2">
								<div className="w-2 h-2 bg-orange-500 rounded-full"></div>
								<span className="text-gray-600">Low stock alert: Fresh Spinach</span>
								<span className="text-xs text-gray-400">10 minutes ago</span>
							</div>
							<div className="flex items-center space-x-3 py-2">
								<div className="w-2 h-2 bg-red-500 rounded-full"></div>
								<span className="text-gray-600">Order canceled: Order #12345</span>
								<span className="text-xs text-gray-400">15 minutes ago</span>
							</div>
							<div className="flex items-center space-x-3 py-2">
								<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
								<span className="text-gray-600">Payment received: ₹5,250</span>
								<span className="text-xs text-gray-400">20 minutes ago</span>
							</div>
							<div className="flex items-center space-x-3 py-2">
								<div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
								<span className="text-gray-600">Inventory updated: Fresh Carrots</span>
								<span className="text-xs text-gray-400">25 minutes ago</span>
							</div>
						</div>
					</div>

					{/* Additional Content to demonstrate scrolling */}
					<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
							<div className="space-y-4">
								{[
									{ name: 'Organic Tomatoes', sales: 245 },
									{ name: 'Fresh Spinach', sales: 189 },
									{ name: 'Basmati Rice', sales: 167 },
									{ name: 'Chicken Breast', sales: 145 },
									{ name: 'Greek Yogurt', sales: 123 }
								].map((product, index) => (
									<div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
										<span className="text-gray-700">{product.name}</span>
										<span className="text-green-600 font-semibold">{product.sales} sold</span>
									</div>
								))}
							</div>
						</div>
						
						<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Regions</h3>
							<div className="space-y-4">
								{[
									{ region: 'North Zone', customers: 456 },
									{ region: 'South Zone', customers: 389 },
									{ region: 'East Zone', customers: 234 },
									{ region: 'West Zone', customers: 168 }
								].map((region, index) => (
									<div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
										<span className="text-gray-700">{region.region}</span>
										<span className="text-blue-600 font-semibold">{region.customers} customers</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
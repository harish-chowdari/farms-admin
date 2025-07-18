import React, { useEffect, useState } from 'react';
import { Users, Package, BarChart3, TrendingUp, ShoppingCart, UserCheck, AlertTriangle, ExternalLink, MessageCircle, FileText, CheckCircle, Plus, Settings, Bell, Download, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Components
import Header from '../../components/layout/Header';
import PrimaryLoader from '../../components/loaders/PrimaryLoader';
// api
import { getOrderStatusCount, productsStats, userStats } from '../../services/api';
import { to5SoldProducts } from './services/api';
// navigations
import ROUTES from '../../navigations/routes';
import { quickActions } from './utils/options';

const AdminDashboard = () => {
    const navigate = useNavigate();

	const [activeCard, setActiveCard] = useState(null);
    const [productStats, setProductStats] = useState({});
    const [customerStats, setCustomerStats] = useState({});
    const [orderStatusStats, setOrderStatusStats] = useState([]);
    const [top5SellingProducts, setTop5SellingProducts] = useState([]);
    const [consultationStats, setConsultationStats] = useState({
        totalConsultations: 24,
        pendingConsultations: 8,
        completedConsultations: 16
    });

    const [isLoading, setIsLoading] = useState(false);

	const dashboardStats = {
		todaySales: 45230
	};

    useEffect(() => {
        const getStats = async() => {
            try {
                setIsLoading(true);
                const res = await productsStats()
                setProductStats(res?.summary)

                const userRes = await userStats()
                setCustomerStats(userRes)
                
                const top5Res = await to5SoldProducts()
                setTop5SellingProducts(top5Res)

                const orderCount = await getOrderStatusCount()
                console.log('orderCount', orderCount)
                setOrderStatusStats(orderCount)
            } catch (error) {
                console.error('Error fetching products summary:', error);
            } finally {
                setIsLoading(false);
            }
        }
        getStats()
    },[])

	const cards = [
		{
			id: 'products',
			title: 'Product Management',
			icon: Package,
			color: 'from-green-500 to-green-600',
			stats: [
				{ label: 'Total Products', value: productStats?.totalProducts || 0, icon: Package },
				{ label: 'Categories', value: productStats?.totalCategories || 0, icon: BarChart3 },
				{ label: 'Out of Stock', value: productStats?.outOfStockCount || 0, icon: AlertTriangle }
			],
            navigateTo: ROUTES.ADD_PRODUCT
		},
		{
			id: 'customers',
			title: 'Customer Management',
			icon: Users,
			color: 'from-blue-500 to-blue-600',
			stats: [
				{ label: 'Total Customers', value: customerStats?.totalUsers || 0, icon: UserCheck },
				{ label: 'New This Month', value: customerStats?.registeredThisMonth || 0, icon: TrendingUp },
				{ label: 'Blocked Customers', value: customerStats?.blockedUsers || 0, icon: ShoppingCart }
			],
            navigateTo: ROUTES.CUSTOMERS
		},
		{
			id: 'consultation',
			title: 'Farmer Consultation',
			icon: MessageCircle,
			color: 'from-orange-500 to-orange-600',
			stats: [
				{ label: 'Total Requests', value: consultationStats?.totalConsultations || 0, icon: FileText },
				{ label: 'Pending', value: consultationStats?.pendingConsultations || 0, icon: MessageCircle },
				{ label: 'Completed', value: consultationStats?.completedConsultations || 0, icon: CheckCircle }
			],
            navigateTo: ROUTES.CONSULTATION || '/consultation'
		},
		{
			id: 'dashboard',
			title: 'Dashboard Analytics',
			icon: BarChart3,
			color: 'from-purple-500 to-purple-600',
			stats: [
				{ label: 'Today\'s Sales', value: `₹${((dashboardStats?.todaySales || 0) / 1000).toFixed(1)}K`, icon: TrendingUp },
				{ label: 'Monthly Revenue', value: '₹8.2L', icon: BarChart3 },
				{ label: 'Growth Rate', value: '+12%', icon: TrendingUp }
			],
            navigateTo: ROUTES.DASHBOARD   
		}
	];

    console.log(orderStatusStats)

	return (
		<div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
			<Header />
            <PrimaryLoader isLoading={isLoading} />

			<div className="flex-1 overflow-y-auto">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
						<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-600 mb-1">Total Customers</p>
									<p className="text-2xl font-bold text-gray-900">{customerStats?.totalUsers || 0}</p>
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
									<p className="text-2xl font-bold text-gray-900">{productStats?.totalProducts || 0}</p>
								</div>
								<div className="bg-green-100 p-3 rounded-lg">
									<Package className="w-6 h-6 text-green-600" />
								</div>
							</div>
						</div>

						<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-600 mb-1">Consultations</p>
									<p className="text-2xl font-bold text-orange-600">{consultationStats?.totalConsultations || 0}</p>
								</div>
								<div className="bg-orange-100 p-3 rounded-lg">
									<MessageCircle className="w-6 h-6 text-orange-600" />
								</div>
							</div>
						</div>

						<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-600 mb-1">Low Stock</p>
									<p className="text-2xl font-bold text-red-600">{productStats?.lowStockCount || 0}</p>
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
									<p className="text-2xl font-bold text-gray-900">₹{((dashboardStats?.todaySales || 0) / 1000).toFixed(1)}K</p>
								</div>
								<div className="bg-purple-100 p-3 rounded-lg">
									<TrendingUp className="w-6 h-6 text-purple-600" />
								</div>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{cards?.map((card) => {
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
												<p className="text-white/80 mt-1">
													{card.id === 'consultation' ? 'Provide expert guidance' : 'Manage and monitor'}
												</p>
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

									{/* Enhanced Hover Overlay with Animation */}
									<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
										<div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
											<div className="bg-white/20 p-4 rounded-full mb-3 mx-auto w-16 h-16 flex items-center justify-center backdrop-blur-sm border border-white/30">
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

                    <div className="md:mb-6 mb-3 mt-6">
						<div className="flex items-center justify-between md:mb-2 mb-1">
							<h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
							{quickActions.map((action) => {
								const ActionIcon = action.icon;
								return (
									<div
										key={action.id}
										onClick={() => navigate(action?.navigateTo)}
										className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 group"
									>
										<div className={`${action?.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
											<ActionIcon className="w-5 h-5 text-white" />
										</div>
										<h3 className="text-sm font-semibold text-gray-900 mb-1">{action?.title}</h3>
										<p className="text-xs text-gray-500">{action?.description}</p>
									</div>
								);
							})}
						</div>
					</div>

					{/* Recent Activity */}
					<div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
						<div className="space-y-3">
							<div className="flex items-center space-x-3 py-2">
								<div className="w-2 h-2 bg-orange-500 rounded-full"></div>
								<span className="text-gray-600">New consultation request: Crop Disease Treatment</span>
								<span className="text-xs text-gray-400">1 minute ago</span>
							</div>
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
								<span className="text-gray-600">Consultation completed: Soil Health Analysis</span>
								<span className="text-xs text-gray-400">8 minutes ago</span>
							</div>
							<div className="flex items-center space-x-3 py-2">
								<div className="w-2 h-2 bg-orange-500 rounded-full"></div>
								<span className="text-gray-600">Low stock alert: Fresh Spinach</span>
								<span className="text-xs text-gray-400">10 minutes ago</span>
							</div>
							<div className="flex items-center space-x-3 py-2">
								<div className="w-2 h-2 bg-red-500 rounded-full"></div>
								<span className="text-gray-600">Order cancelled: Order #9b4fd439</span>
								<span className="text-xs text-gray-400">15 minutes ago</span>
							</div>
						</div>
					</div>

					{/* Additional Content to demonstrate scrolling */}
					<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
							<div className="space-y-4">
								{top5SellingProducts?.slice(0, 5)?.map((product, index) => (
									<div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
										<span className="text-gray-700">{product?.productName || 'N/A'}</span>
										<span className="text-green-600 font-semibold">{product?.totalSold || 0} sold</span>
									</div>
								))}
							</div>
						</div>
						
						<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
							<div className="space-y-4">
								{orderStatusStats?.map((stat, index) => (
									<div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
										<span className="text-gray-700">{stat?.status?.charAt(0)?.toUpperCase() + stat?.status?.slice(1) || 'N/A'}</span>
										<span className="text-blue-600 font-semibold">{stat?.count || 0} Orders</span>
									</div>
								))}
							</div>
						</div>

						<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Consultations</h3>
							<div className="space-y-4">
								<div className="flex items-center justify-between py-2 border-b border-gray-100">
									<span className="text-gray-700">Pest Control</span>
									<span className="text-orange-600 font-semibold">Pending</span>
								</div>
								<div className="flex items-center justify-between py-2 border-b border-gray-100">
									<span className="text-gray-700">Soil Testing</span>
									<span className="text-green-600 font-semibold">Completed</span>
								</div>
								<div className="flex items-center justify-between py-2 border-b border-gray-100">
									<span className="text-gray-700">Crop Rotation</span>
									<span className="text-green-600 font-semibold">Completed</span>
								</div>
								<div className="flex items-center justify-between py-2 border-b border-gray-100">
									<span className="text-gray-700">Fertilizer Guide</span>
									<span className="text-orange-600 font-semibold">In Progress</span>
								</div>
								<div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
									<span className="text-gray-700">Weather Advisory</span>
									<span className="text-green-600 font-semibold">Completed</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
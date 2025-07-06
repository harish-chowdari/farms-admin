import { AlertCircle, Calendar, Package, Plus, Search, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import ProductCard from "./components/ProductCard";
import PageLayout from "../../../../components/layout/PageLayout";
import { sidebarHeading, sidebarItems } from "../../config/sidebar";

export default function index() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [viewMode, setViewMode] = useState('grid');

	// Sample product data based on your structure
	const products = [
		{
			_id: '686a0a25d9ae2b6af0421d9d',
			productName: 'tomato',
			productImage: ['https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400&h=300&fit=crop'],
			weight: 1,
			weightUnit: 'kg',
			price: 10,
			discountPrice: 8,
			description: 'organic tomatos',
			category: 'Vegetables',
			subCategory: '',
			quantity: 10,
			freshness: 'Fresh',
			expiryDate: '2025-07-12T00:00:00.000+00:00',
			origin: 'farm a',
			brand: 'brand',
			tags: [],
			createdAt: '2025-07-06T05:31:17.733+00:00'
		},
		{
			_id: '686a0a25d9ae2b6af0421d9e',
			productName: 'Fresh Carrots',
			productImage: ['https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400&h=300&fit=crop'],
			weight: 0.5,
			weightUnit: 'kg',
			price: 15,
			discountPrice: 12,
			description: 'Premium organic carrots',
			category: 'Vegetables',
			subCategory: 'Root Vegetables',
			quantity: 25,
			freshness: 'Fresh',
			expiryDate: '2025-07-15T00:00:00.000+00:00',
			origin: 'farm b',
			brand: 'Fresh Farm',
			tags: ['organic'],
			createdAt: '2025-07-05T10:15:30.000+00:00'
		},
		{
			_id: '686a0a25d9ae2b6af0421d9f',
			productName: 'Green Apples',
			productImage: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop'],
			weight: 2,
			weightUnit: 'kg',
			price: 25,
			discountPrice: 20,
			description: 'Crisp and juicy green apples',
			category: 'Fruits',
			subCategory: 'Apples',
			quantity: 50,
			freshness: 'Fresh',
			expiryDate: '2025-07-20T00:00:00.000+00:00',
			origin: 'orchard valley',
			brand: 'Valley Fresh',
			tags: ['premium', 'sweet'],
			createdAt: '2025-07-04T14:22:15.000+00:00'
		}
	];

	const categories = ['all', 'Vegetables', 'Fruits', 'Dairy', 'Grains'];

	const filteredProducts = products.filter(product => {
		const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const getDaysUntilExpiry = (expiryDate) => {
		const today = new Date();
		const expiry = new Date(expiryDate);
		const diffTime = expiry - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};

	return (
		<PageLayout sidebarHeading={sidebarHeading} sidebarItems={sidebarItems} pageHeading={"Product Management"}>
            <div className="min-h-screen bg-white">
                {/* Stats */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Products</p>
                                    <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <Package className="text-blue-600" size={24} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Low Stock</p>
                                    <p className="text-2xl font-bold text-orange-600">
                                        {products.filter(p => p.quantity <= 10).length}
                                    </p>
                                </div>
                                <div className="bg-orange-50 p-3 rounded-lg">
                                    <AlertCircle className="text-orange-600" size={24} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Expiring Soon</p>
                                    <p className="text-2xl font-bold text-red-600">
                                        {products.filter(p => getDaysUntilExpiry(p.expiryDate) <= 3).length}
                                    </p>
                                </div>
                                <div className="bg-red-50 p-3 rounded-lg">
                                    <Calendar className="text-red-600" size={24} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Value</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        ${products.reduce((sum, p) => sum + (p.discountPrice * p.quantity), 0)}
                                    </p>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg">
                                    <TrendingUp className="text-green-600" size={24} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <div className="flex flex-col sm:flex-row gap-4 flex-1">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <select
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category === 'all' ? 'All Categories' : category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                                        <div className="bg-current rounded-sm"></div>
                                        <div className="bg-current rounded-sm"></div>
                                        <div className="bg-current rounded-sm"></div>
                                        <div className="bg-current rounded-sm"></div>
                                    </div>
                                </button>
                                <button
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    <div className="w-4 h-4 flex flex-col gap-0.5">
                                        <div className="bg-current h-0.5 rounded-sm"></div>
                                        <div className="bg-current h-0.5 rounded-sm"></div>
                                        <div className="bg-current h-0.5 rounded-sm"></div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3 gap-6">
                        {filteredProducts?.map(product => (
                            <ProductCard key={product?._id} product={product} />
                        ))}
                    </div>

                    {filteredProducts?.length === 0 && (
                        <div className="text-center py-12">
                            <Package className="mx-auto text-gray-400 mb-4" size={48} />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
	);
}
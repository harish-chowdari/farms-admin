import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Edit, Trash2, Eye, Package, TrendingUp, AlertCircle, Calendar } from 'lucide-react';

export default function ProductCard({ product }) {

    const navigate = useNavigate();

	const getStockStatus = (quantity) => {
		if (quantity > 20) return { status: 'High', color: 'text-green-600 bg-green-50' };
		if (quantity > 10) return { status: 'Medium', color: 'text-yellow-600 bg-yellow-50' };
		return { status: 'Low', color: 'text-red-600 bg-red-50' };
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	const getDaysUntilExpiry = (expiryDate) => {
		const today = new Date();
		const expiry = new Date(expiryDate);
		const diffTime = expiry - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};

	const stockStatus = getStockStatus(product?.quantity);
	const daysUntilExpiry = getDaysUntilExpiry(product?.expiryDate);
	const discountPercentage = Math.round(((product?.price - product?.discountPrice) / product?.price) * 100);

	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
			<div className="relative">
				<img 
					src={product?.productImage[0]} 
					alt={product?.productName}
					className="w-full h-48 object-cover"
				/>
				{discountPercentage > 0 && (
					<div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
						{discountPercentage}% OFF
					</div>
				)}
				<div className="absolute top-3 right-3 flex flex-col gap-1">
					<span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
						{stockStatus.status}
					</span>
					{ product?.expiryDate && product?.expiryDate !== null && daysUntilExpiry <= 3 && (
						<span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
							<AlertCircle size={12} />
							{daysUntilExpiry}d
						</span>
					)}
				</div>
			</div>
			
			<div className="p-5">
				<div className="flex justify-between items-start mb-3">
					<h3 className="text-lg font-semibold text-gray-900 capitalize">{product.productName}</h3>
					<div className="text-right">
						<div className="flex items-center gap-2">
							<span className="text-lg font-bold text-gray-900">${product.discountPrice}</span>
							{product.price !== product.discountPrice && (
								<span className="text-sm text-gray-500 line-through">${product.price}</span>
							)}
						</div>
						<div className="text-xs text-gray-500">{product.weight} {product.weightUnit}</div>
					</div>
				</div>

				<p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

				<div className="flex flex-wrap gap-2 mb-4">
					{ product?.category && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
						{product.category}
					</span>}
					{ product?.freshness && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
						{product?.freshness}
					</span>}
					{ product?.brand && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
						{product?.brand}
					</span>}
				</div>

				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2 text-sm text-gray-600">
						<Package size={16} />
						<span>Qty: {product.quantity}</span>
					</div>
					{ product?.expiryDate && product?.expiryDate !== null && <div className="flex items-center gap-2 text-sm text-gray-600">
						<Calendar size={16} />
						<span>Exp: {formatDate(product?.expiryDate)}</span>
					</div>}
				</div>

				<div className="flex gap-2">
					<button className="flex-1 cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
						<Eye size={16} />
						View
					</button>
					<button onClick={() => navigate(`/product-management/edit-product/${product._id}`)} className="flex-1 cursor-pointer bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
						<Edit size={16} />
						Edit
					</button>
					<button className="bg-red-50 cursor-pointer text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center">
						<Trash2 size={16} />
					</button>
				</div>
			</div>
		</div>
	);
}
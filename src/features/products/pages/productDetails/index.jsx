import React, { useEffect, useState } from 'react';
import { 
	Calendar, 
	MapPin, 
	Package, 
	DollarSign, 
	Percent, 
	Scale, 
	AlertCircle,
	Check
} from 'lucide-react';
import PageLayout from '../../../../components/layout/PageLayout';
import { sidebarHeading, sidebarItems } from '../../config/sidebar';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/api';
import PrimaryLoader from '../../../../components/loaders/PrimaryLoader';

const ProductDetailsPage = () => {

	const [productData, setProductData] = useState(null);

    const {productId} = useParams();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                setIsLoading(true);
                const response = await getProductById(productId);
                setProductData(response);
            } catch (error) {
                console.error('API Error:', error);
            } finally {
                setIsLoading(false);
            }
        }

        getProductDetails();
    }, []);

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	const getStatusColor = (expiryDate) => {
		const expiry = new Date(expiryDate);
		const now = new Date();
		const daysUntilExpiry = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
		
		if (daysUntilExpiry < 0) return 'text-red-600 bg-red-50';
		if (daysUntilExpiry <= 3) return 'text-orange-600 bg-orange-50';
		return 'text-green-600 bg-green-50';
	};

	const discountPercentage = Math.round(((productData?.price - productData?.discountPrice) / productData?.price) * 100);

	return (
		<PageLayout sidebarHeading={sidebarHeading} sidebarItems={sidebarItems} pageHeading={"Product Details"}>
            <PrimaryLoader isLoading={isLoading} message={"Loading Product Details..."} />
			<div className="bg-white p-4">
				{/* Header */}
				<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
					<div className="flex items-center space-x-4">
						<div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
							<Package className="w-6 h-6 text-white" />
						</div>
						<div>
							<h1 className="text-2xl font-bold text-gray-900 capitalize">
								{productData?.productName}
							</h1>
							<p className="text-gray-500">Product ID: {productData?._id}</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Product Image */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">Product Image</h2>
							<div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
								<img
									src={productData?.productImage[0]}
									alt={productData?.productName}
									className="w-full h-full object-cover"
								/>
							</div>
						</div>
					</div>

					{/* Product Details */}
					<div className="lg:col-span-2 space-y-6">
						{/* Basic Information */}
						<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Product Name
									</label>
									<p className="text-gray-900 capitalize font-medium">{productData?.productName}</p>
								</div>
								
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Category
									</label>
									<p className="text-gray-900 font-medium">{productData?.category}</p>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Weight
									</label>
									<div className="flex items-center space-x-2">
										<Scale className="w-4 h-4 text-gray-400" />
										<p className="text-gray-900 font-medium">{productData?.weight} {productData?.weightUnit}</p>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Origin
									</label>
									<div className="flex items-center space-x-2">
										<MapPin className="w-4 h-4 text-gray-400" />
										<p className="text-gray-900 font-medium">{productData?.origin}</p>
									</div>
								</div>
							</div>

							<div className="mt-6">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Description
								</label>
								<p className="text-gray-900">{productData?.description}</p>
							</div>
						</div>

						{/* Pricing & Inventory */}
						<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-6">Pricing & Inventory</h2>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Price
									</label>
									<div className="flex items-center space-x-2">
										<DollarSign className="w-4 h-4 text-gray-400" />
										<p className="text-gray-900 font-medium">₹{productData?.price}</p>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Discount Price
									</label>
									<div className="flex items-center space-x-2">
										<Percent className="w-4 h-4 text-gray-400" />
										<div className="flex items-center space-x-2">
											<p className="text-gray-900 font-medium">₹{productData?.discountPrice}</p>
											<span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
												{discountPercentage}% OFF
											</span>
										</div>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Quantity
									</label>
									<div className="flex items-center space-x-2">
										<Package className="w-4 h-4 text-gray-400" />
										<p className="text-gray-900 font-medium">{productData?.quantity} units</p>
									</div>
								</div>
							</div>
						</div>

						{/* Freshness & Expiry */}
						<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-6">Freshness & Expiry</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Freshness Status
									</label>
									<div className="flex items-center space-x-2">
										<Check className="w-4 h-4 text-green-500" />
										<span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
											{productData?.freshness}
										</span>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Expiry Date
									</label>
									<div className="flex items-center space-x-2">
										<Calendar className="w-4 h-4 text-gray-400" />
										<div className="flex items-center space-x-2">
											<p className="text-gray-900 font-medium">{formatDate(productData?.expiryDate)}</p>
											<span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(productData?.expiryDate)}`}>
												<AlertCircle className="w-3 h-3 inline mr-1" />
												{new Date(productData?.expiryDate) < new Date() ? 'Expired' : 'Valid'}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* System Information */}
						<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-6">System Information</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Created At
									</label>
									<p className="text-gray-900">{formatDate(productData?.createdAt)}</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Last Updated
									</label>
									<p className="text-gray-900">{formatDate(productData?.updatedAt)}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageLayout>
	);
};

export default ProductDetailsPage;
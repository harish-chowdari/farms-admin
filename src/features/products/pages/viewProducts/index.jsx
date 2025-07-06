import { AlertCircle, Calendar, Package, Plus, Search, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ProductCard from "./components/ProductCard";
import Pagination from "../../../../components/layout/Pagination";
import PageLayout from "../../../../components/layout/PageLayout";
import Input from "../../../../components/fields/Input";
import Select from "../../../../components/fields/Select";
import { sidebarHeading, sidebarItems } from "../../config/sidebar";
import { getAllProductsPaginated } from "./services/api";
import PrimaryLoader from "../../../../components/loaders/PrimaryLoader";
import { categories, sortOptions } from "./utils/options";

const PAGE_SIZE = 12;


export default function index() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState('desc');
    

    // Formik for form handling
    const formik = useFormik({
        initialValues: {
            searchTerm: '',
            selectedCategory: 'all',
            sortBy: 'createdAt'
        },
        onSubmit: (values) => {
            // This will be called when form is submitted (Enter key or button click)
            if (currentPage === 1) {
                fetchProducts(1);
            } else {
                setCurrentPage(1);
            }
        }
    });

    const getDaysUntilExpiry = (expiryDate) => {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const fetchProducts = async (page = 1, resetPage = false) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const filters = {
                search: formik.values.searchTerm,
                category: formik.values.selectedCategory,
                sortBy: formik.values.sortBy,
                sortOrder
            };

            const response = await getAllProductsPaginated(resetPage ? 1 : page, PAGE_SIZE, filters);
            
            setProducts(response.products);
            setTotalPages(response.totalPages);
            setTotal(response.total);
            setCurrentPage(response.currentPage);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch products when dependencies change
    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    // Reset to first page when category or sortBy changes
    useEffect(() => {
        if (currentPage === 1) {
            fetchProducts(1);
        } else {
            setCurrentPage(1);
        }
    }, [formik.values.selectedCategory, formik.values.sortBy, sortOrder]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleResetFilters = () => {
        formik.resetForm();
        setSortOrder('desc');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            formik.handleSubmit();
        }
    };

    const statsData = {
        totalProducts: total,
        lowStock: products.filter(p => p.quantity <= 10).length,
        expiringSoon: products.filter(p => getDaysUntilExpiry(p.expiryDate) <= 3).length,
        totalValue: products.reduce((sum, p) => sum + (p.discountPrice * p.quantity), 0)
    };

    return (
        <PageLayout sidebarHeading={sidebarHeading} sidebarItems={sidebarItems} pageHeading={"Product Management"}>
            <PrimaryLoader isLoading={isLoading} />
            <div className="min-h-screen bg-white">
                {/* Stats */}
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Products</p>
                                    <p className="text-2xl font-bold text-gray-900">{statsData.totalProducts}</p>
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
                                    <p className="text-2xl font-bold text-orange-600">{statsData.lowStock}</p>
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
                                    <p className="text-2xl font-bold text-red-600">{statsData.expiringSoon}</p>
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
                                        ${statsData.totalValue.toFixed(2)}
                                    </p>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg">
                                    <TrendingUp className="text-green-600" size={24} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            {/* Search Bar */}
                            <div className="flex flex-col sm:flex-row gap-4 items-end justify-between">
                                <div className="flex-1 max-w-md">
                                    <div className="relative">
                                        <Input
                                            label="Search Products"
                                            name="searchTerm"
                                            type="text"
                                            placeholder="Search products... (Press Enter to search)"
                                            isErrorRequired={false}
                                            formik={formik}
                                            onKeyPress={handleKeyPress}
                                        />
                                        <Search className="absolute right-3 top-8 text-gray-400" size={20} />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Search
                                </button>
                            </div>

                            {/* Filters */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <Select
                                    label="Category"
                                    name="selectedCategory"
                                    options={categories}
                                    isErrorRequired={false}
                                    formik={formik}
                                />

                                <Select
                                    label="Sort By"
                                    name="sortBy"
                                    options={sortOptions}
                                    isErrorRequired={false}
                                    formik={formik}
                                />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-[1px]">
                                        Sort Order
                                    </label>
                                    <select
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                                    >
                                        <option value="desc">Descending</option>
                                        <option value="asc">Ascending</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleResetFilters}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center">
                                <AlertCircle className="text-red-500 mr-2" size={20} />
                                <span className="text-red-700">{error}</span>
                            </div>
                        </div>
                    )}

                    {/* Loading State */}
                    {isLoading && (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="text-gray-600 mt-4">Loading products...</p>
                        </div>
                    )}

                    {/* Products Grid */}
                    {!isLoading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3 gap-6">
                            {products?.map(product => (
                                <ProductCard key={product?._id} product={product} />
                            ))}
                        </div>
                    )}

                    {/* No Products Found */}
                    {!isLoading && products?.length === 0 && (
                        <div className="text-center py-12">
                            <Package className="mx-auto text-gray-400 mb-4" size={48} />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {!isLoading && (
                        <div className="mt-8">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                total={total}
                                pageSize={PAGE_SIZE}
                            />
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
}
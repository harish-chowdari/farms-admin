import React from 'react';
import { Package } from 'lucide-react';
import Input from '../../../components/fields/Input';
import Select from '../../../components/fields/Select';
import TextArea from '../../../components/fields/TextArea';

const ProductDetails = ({ formik }) => {
    const categories = [
        { value: '', label: 'Select category' },
        { value: 'Vegetables', label: 'Vegetables' },
        { value: 'Fruits', label: 'Fruits' },
        { value: 'Dairy', label: 'Dairy' },
        { value: 'Other', label: 'Other' }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Product Details Section</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <div className="md:col-span-2">
                    <Input 
                        label="Product Name" 
                        placeholder="Enter product name" 
                        name="productName" 
                        formik={formik} 
                        isFieldRequired={true}
                    />
                </div>
                
                <div className="md:col-span-2">
                    <TextArea 
                        label="Product Description" 
                        placeholder="Enter detailed product description..." 
                        name="description" 
                        rows={4}
                        formik={formik} 
                    />
                </div>

                <div>
                    <Select 
                        label="Category" 
                        name="category" 
                        options={categories}
                        formik={formik} 
                        isFieldRequired={true}
                    />
                </div>

                <div>
                    <Input 
                        label="Sub Category" 
                        placeholder="Enter sub category (optional)" 
                        name="subCategory" 
                        formik={formik} 
                    />
                </div>

                <div>
                    <Input 
                        label="Brand" 
                        placeholder="Enter brand name (optional)" 
                        name="brand" 
                        formik={formik} 
                    />
                </div>

                <div>
                    <Input 
                        label="Origin" 
                        placeholder="e.g., Farm A, Village B" 
                        name="origin" 
                        formik={formik} 
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import Input from '../../../../../components/fields/Input';
import Select from '../../../../../components/fields/Select';

const PricingSection = ({ formik }) => {
    const weightUnits = [
        { value: '', label: 'Select unit' },
        { value: 'g', label: 'grams (g)' },
        { value: 'kg', label: 'kilograms (kg)' },
        { value: 'ml', label: 'milliliters (ml)' },
        { value: 'l', label: 'liters (l)' },
        { value: 'pcs', label: 'pieces (pcs)' }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 rounded-lg">
                    <ShoppingCart className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Pricing & Inventory</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
                <div>
                    <Input 
                        label="Price (₹)" 
                        placeholder="0.00" 
                        name="price" 
                        type="number"
                        step="0.01"
                        min="0"
                        formik={formik} 
                    />
                </div>
                
                <div>
                    <Input 
                        label="Discount Price (₹)" 
                        placeholder="0.00" 
                        name="discountPrice" 
                        type="number"
                        step="0.01"
                        min="0"
                        formik={formik} 
                    />
                </div>
                
                <div>
                    <Input 
                        label="Stock Quantity" 
                        placeholder="0" 
                        name="quantity" 
                        type="number"
                        min="0"
                        formik={formik} 
                    />
                </div>
                
                <div>
                    <Input 
                        label="Weight/Volume" 
                        placeholder="0" 
                        name="weight" 
                        type="number"
                        min="0"
                        formik={formik} 
                    />
                </div>
                
                <div>
                    <Select 
                        label="Weight Unit" 
                        name="weightUnit" 
                        options={weightUnits}
                        formik={formik} 
                    />
                </div>
            </div>
        </div>
    );
};

export default PricingSection;
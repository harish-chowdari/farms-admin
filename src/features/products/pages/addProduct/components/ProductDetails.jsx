import React from 'react';
import { Sprout } from 'lucide-react';
import Input from '../../../../../components/fields/Input';
import Select from '../../../../../components/fields/Select';

const ProductDetails = ({ formik }) => {
    const freshnessOptions = [
        { value: 'Fresh', label: 'Fresh' },
        { value: 'Frozen', label: 'Frozen' },
        { value: 'Preserved', label: 'Preserved' }
    ];

    const handleTagsChange = (e) => {
        const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
        formik.setFieldValue('tags', tagsArray);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                    <Sprout className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Product Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <div>
                    <Select 
                        label="Freshness" 
                        name="freshness" 
                        options={freshnessOptions}
                        formik={formik} 
                    />
                </div>
                
                <div>
                    <Input label={'Expiry Date'} name="expiryDate" type="date" formik={formik} />
                </div>
                
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags (comma-separated)
                    </label>
                    <input
                        type="text"
                        name="tags"
                        placeholder="organic, farm-fresh, premium"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500"
                        value={formik.values.tags ? formik.values.tags.join(', ') : ''}
                        onChange={handleTagsChange}
                        onBlur={formik.handleBlur}
                    />
                    <p className="mt-1 text-sm text-gray-500">Separate tags with commas</p>
                    {formik.touched.tags && formik.errors.tags && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.tags}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
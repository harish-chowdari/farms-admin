import React, { useState } from 'react'
import { Package, ShoppingCart, Sprout } from 'lucide-react';

import PageLayout from '../../../../components/layout/PageLayout';
import { sidebarHeading, sidebarItems } from '../../config/sidebar';
import { useFormik } from 'formik';
import initialValues from './utils/initialValues';
import { validationSchema } from './utils/validationSchema';
import BasicInfoSection from './components/BasicInfoSection';
import PricingSection from './components/PricingSection';
import ProductDetailsSection from './components/ProductDetails';
import FileUpload from '../../../../components/fields/FileUpload';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import { addProduct } from './services/api';

export default function index() {
    const [uploadedImages, setUploadedImages] = useState([]);

    const handleSubmit = async (values) => {
        console.log('Submitting values:', values)

        const formData = new FormData()

        Object.entries(values).forEach(([key, val]) => {
            if (Array.isArray(val)) {
            // this will only run for your images array
            val.forEach((file) => {
                formData.append(key, file)
            })
            } else if (val !== undefined && val !== null) {
            // append all other fields (strings, numbers, booleans)
            formData.append(key, val)
            }
        })

        try {
            const res = await addProduct(formData)
            console.log('API response:', res)
        } catch (error) {
            console.error('API error:', error)
        }
    }



    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        // validationSchema: validationSchema
    });



    return (
        <PageLayout pageHeading="Add Product" sidebarHeading={sidebarHeading} sidebarItems={sidebarItems}>
            <div className="p-3 bg-gray-50 min-h-screen">
                <form onSubmit={formik.handleSubmit} className="mx-auto space-y-8">
                    
                    <BasicInfoSection formik={formik} />
                    
                    <PricingSection formik={formik} />
                    
                    <ProductDetailsSection formik={formik} />

                    <FileUpload 
                        formik={formik} 
                        uploadedImages={uploadedImages} 
                        setUploadedImages={setUploadedImages} 
                    />

                    {/* Submit Button */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 flex gap-3 items-center justify-end">
                        <PrimaryButton type='button' variant='outline' label={'Cancel'}  />
                        <PrimaryButton type='submit' label={'Submit'}  />
                    </div>
                </form>
            </div>
        </PageLayout>
    )
}
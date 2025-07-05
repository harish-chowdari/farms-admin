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

export default function index() {
    const [uploadedImages, setUploadedImages] = useState([]);

    const handleSubmit = (values) => {
        console.log(values)
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema
    });

    return (
        <PageLayout pageHeading="Add Product" sidebarHeading={sidebarHeading} sidebarItems={sidebarItems}>
            <div className="p-6 bg-gray-50 min-h-screen">
                <form onSubmit={formik.handleSubmit} className="max-w-6xl mx-auto space-y-8">
                    
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
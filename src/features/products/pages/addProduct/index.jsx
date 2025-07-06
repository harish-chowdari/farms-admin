import React, { useState } from 'react'
import { useFormik } from 'formik';

// components
import PageLayout from '../../../../components/layout/PageLayout';
import ProductDetails from '../../components/ProductDetails';
import ExtraInfo from '../../components/ExtraInfo';
import PricingSection from '../../components/PricingSection';
import FileUpload from '../../../../components/fields/FileUpload';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
// utils
import { sidebarHeading, sidebarItems } from '../../config/sidebar';
import initialValues from './utils/initialValues';
import { validationSchema } from './utils/validationSchema';
// services
import { addProduct } from './services/api';
import PrimaryLoader from '../../../../components/loaders/PrimaryLoader';


export default function index() {
    const [uploadedImages, setUploadedImages] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values) => {

        const formData = new FormData()

        Object.entries(values).forEach(([key, val]) => {
            if (Array.isArray(val)) {
                val.forEach((file) => {
                    formData.append(key, file)
                })
            } else if (val !== undefined && val !== null) {
                formData.append(key, val)
            }
        })
        try {
            setIsLoading(true)
            const res = await addProduct(formData)
            console.log('API response:', res)
        } catch (error) {
            console.error('API error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema
    });

    return (
        <PageLayout pageHeading="Add Product" sidebarHeading={sidebarHeading} sidebarItems={sidebarItems}>
            <PrimaryLoader isLoading={isLoading} />
            <div className="bg-gray-50 min-h-screen">
                <form onSubmit={formik.handleSubmit} className="mx-auto space-y-8">
                    
                    <ProductDetails formik={formik} />
                    
                    <ExtraInfo formik={formik} />
                    
                    <PricingSection formik={formik} />

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
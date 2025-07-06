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
        validationSchema: validationSchema
    });

    return (
        <PageLayout pageHeading="Add Product" sidebarHeading={sidebarHeading} sidebarItems={sidebarItems}>
            <div className="p-3 bg-gray-50 min-h-screen">
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
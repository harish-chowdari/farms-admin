import React, { useEffect, useState } from 'react'
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
// services
import { updateProduct } from './services/api';
import PrimaryLoader from '../../../../components/loaders/PrimaryLoader';
import { useParams } from 'react-router-dom';
import initialValues from './utils/initialValues';
import { validationSchema } from './utils/validationSchema';
import { getProductById } from '../../services/api';


export default function index() {

    const productId = useParams()?.id
    console.log('productId:', productId)

    const [uploadedImages, setUploadedImages] = useState([]);

    const [productData, setProductData] = useState({});

    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const res = await getProductById(productId)
                const formattedData = {
                    ...res,
                    expiryDate: res.expiryDate ? res.expiryDate.split('T')[0] : ''
                }
			    setProductData(formattedData)
                console.log('productData:', res)
            } catch (error) {
                console.error('API error:', error)
            }
        }
        fetchProductById()
    }, [productId])

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
            const res = await updateProduct(productId, formData)
            console.log('API response:', res)
        } catch (error) {
            console.error('API error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const formik = useFormik({
        initialValues: productData || initialValues,
        onSubmit: handleSubmit,
        enableReinitialize: true,
        validationSchema: validationSchema
    });

    return (
        <PageLayout pageHeading="Edit Product" sidebarHeading={sidebarHeading} sidebarItems={sidebarItems}>
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
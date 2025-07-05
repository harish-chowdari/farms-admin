import * as yup from 'yup';

export const validationSchema = yup.object().shape({
    productName: yup.string().required('Product name is required'),
    description: yup.string().required('Product description is required'),
    price: yup.number().required('Product price is required'),
    quantity: yup.number().required('Product quantity is required'),
    image: yup.string().required('Product image is required'),
});
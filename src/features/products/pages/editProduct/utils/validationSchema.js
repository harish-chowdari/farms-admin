import * as yup from 'yup'

export const validationSchema = yup.object().shape({
	productName: yup
		.string()
		.trim()
		.max(100, 'Maximum 100 characters allowed')
		.required('Product name is required'),

	productImage: yup
		.array()
		.required('Image is required')
		.min(1, 'At least one product image is required')
		.required('Product images are required'),

	weight: yup
		.number()
		.typeError('Weight must be a number')
		.required('Product weight is required'),

	weightUnit: yup
		.string()
		.oneOf(['g', 'kg', 'ml', 'l', 'pcs'], 'Invalid weight unit')
		.max(3, 'Maximum 3 characters allowed')
		.required('Weight unit is required'),

	price: yup
		.number()
        .min(1, 'Price cannot be less than 1')
        .max(100000, 'Price cannot exceed 100,000')
		.typeError('Price must be a number')
		.required('Product price is required'),

	discountPrice: yup
		.number()
		.typeError('Discount price must be a number')
		.min(0, 'Discount price cannot be negative'),

	description: yup
		.string()
		.max(500, 'Maximum 500 characters allowed'),

	category: yup
		.string()
		.oneOf(['Vegetables', 'Fruits', 'Dairy', 'Other'], 'Invalid category')
		.max(20, 'Maximum 20 characters allowed')
		.required('Category is required'),

	subCategory: yup
		.string()
		.max(100, 'Maximum 100 characters allowed'),

	quantity: yup
		.number()
		.typeError('Quantity must be a number')
		.required('Quantity is required'),

	freshness: yup
		.string()
		.oneOf(['Fresh', 'Frozen', 'Preserved'], 'Invalid freshness type')
		.max(10, 'Maximum 10 characters allowed'),

	expiryDate: yup
		.date()
		.nullable()
		.typeError('Invalid expiry date'),

	origin: yup
		.string()
		.max(100, 'Maximum 100 characters allowed'),

	brand: yup
		.string()
		.max(100, 'Maximum 100 characters allowed'),

	tags: yup
		.array()
		.of(yup.string().max(50, 'Maximum 50 characters allowed per tag'))
})

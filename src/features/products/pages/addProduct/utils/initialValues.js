const initialValues = {
	productName: '',
	images: [], // array of image URLs
	weight: '',
	weightUnit: '', // must be one of ['g', 'kg', 'ml', 'l', 'pcs']
	price: '',
	discountPrice: 0,
	description: '',
	category: '', // must be one of ['Vegetables', 'Fruits', 'Dairy', 'Other']
	subCategory: '',
	quantity: '',
	isAvailable: true,
	rating: 0,
	reviewsCount: 0,
	freshness: 'Fresh', // default
	expiryDate: '',
	origin: '',
	brand: '',
	tags: [], // array of strings
}


export default initialValues
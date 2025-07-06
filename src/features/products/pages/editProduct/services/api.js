import axiosInstance from "../../../../../services/axios"

export async function updateProduct(productId, data) {
   try {
        const response = await axiosInstance.put(`/products/update-product/${productId}`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        return response?.data
    } catch (error) {
        console.error('API Error:', error);
    }
}


export async function getProductById(productId) {
    try {
        const response = await axiosInstance.get(`/products/get-product/${productId}`)
        // console.log('response:', response?.data)
        return response?.data
    } catch (error) {
        console.error('API Error:', error);
    }
}

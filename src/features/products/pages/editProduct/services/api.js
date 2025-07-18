import axiosInstance from "../../../../../services/axios"

export async function updateProduct(productId, data) {
   try {
        const response = await axiosInstance.put(`/api/products/update-product/${productId}`,
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

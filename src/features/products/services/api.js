import axiosInstance from "../../../services/axios";

export async function getProductById(productId) {
    try {
        const response = await axiosInstance.get(`/products/get-product/${productId}`)
        return response?.data
    } catch (error) {
        console.error('API Error:', error);
    }
}
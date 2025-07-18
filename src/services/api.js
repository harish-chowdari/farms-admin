import axiosInstance from "./axios";

async function productsStats() {
    try {
        const response = await axiosInstance.get(`/api/products/products-stats`);
        return response?.data;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
}

async function userStats() {
    try {
        const response = await axiosInstance.get(`/api/auth/get-user-stats`);
        return response?.data;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
}

async function getOrderStatusCount() {
    try {
        const response = await axiosInstance.get(`/api/orders/dashboard/get-order-status-counts`);
        return response?.data;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
}
    
export { productsStats, userStats, getOrderStatusCount };
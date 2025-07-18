import axiosInstance from "../../../../../services/axios";


async function getAllOrders() {
    try {
        const response = await axiosInstance.get(`/orders/get-all-orders/paginated`); 
        return response?.data;
    } catch (error) {
        console.error('API error:', error);
    }
}

// orders/get-order-stats

async function getOrdersStats() {
    try {
        const response = await axiosInstance.get(`/orders/get-order-stats`); 
        return response?.data;
    } catch (error) {
        console.error('API error:', error);
    }
}

export { getAllOrders, getOrdersStats };
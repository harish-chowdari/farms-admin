import axiosInstance from "../../../../../services/axios";

async function getCustomerOrders(userId) {
    try {
        const response = await axiosInstance.get(`/api/orders/get-orders-by-userId/paginated/${userId}`,);
        return response?.data;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
}

export { getCustomerOrders };
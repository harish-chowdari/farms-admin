import axiosInstance from "../../../../../services/axios";

async function getUsersOrderSummary() {
    try {
        const response = await axiosInstance.get(`/orders/get-users-order-summary`,);
        return response?.data;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
}


export { getUsersOrderSummary };
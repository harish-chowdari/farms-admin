import axiosInstance from "../../../../../services/axios";


async function getAllUsers() {
    try {
        const response = await axiosInstance.get('/auth/get-all-users', {  });
        return response.data;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
}


export { getAllUsers };
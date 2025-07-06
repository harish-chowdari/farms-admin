import axiosInstance from "../../../../../services/axios";

async function getAllProductsPaginated(page) {
    try {
        const response = await axiosInstance.get(`/products/get-products/paginated?page=${page}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export { getAllProductsPaginated };
import axiosInstance from "../../../../../services/axios"

export async function addProduct(data) {
    const response = await axiosInstance.post(
        `/api/products/add-product`,
        data,
        {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        }
    )
    return response?.data
}

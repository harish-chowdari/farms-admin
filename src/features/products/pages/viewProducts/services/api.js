import axiosInstance from "../../../../../services/axios";

async function getAllProductsPaginated(page, limit, filters) {
    try {
        // Extract individual filter values
        const { search, category, sortBy, sortOrder } = filters;
        
        // Build query parameters object
        const params = {
            page,
            limit,
        };
        
        // Add filters as individual parameters (not nested)
        if (search) params.search = search;
        if (category && category !== 'all') params.category = category;
        if (sortBy) params.sortBy = sortBy;
        if (sortOrder) params.sortOrder = sortOrder;
        
        const response = await axiosInstance.get('/api/products/get-products/paginated', {
            params
        });
        
        // Transform response to match frontend expectations
        return {
            products: response.data.data,
            total: response.data.pagination.total,
            currentPage: response.data.pagination.page,
            totalPages: response.data.pagination.totalPages
        };
    } catch (error) {
        console.error('API Error:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
}

export { getAllProductsPaginated };
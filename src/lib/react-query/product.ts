import { ProductDetail, ProductsData } from "@/types/product";
import api from "@/utils/api";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

/**
 * API function to fetch product list (no hooks)
 * @returns Promise with product list
 */
export const getProducts = async (params: { keyword: string; page: number; size: number; sortDirection?: string }) => {
    try {
        const { data } = await api.post<ProductsData>(`/api/pet-store/v1/search-products`, {
            keyword: params.keyword ?? "",
            page: params.page ?? 0,
            size: params.size ?? 10,
            sortDirection: params.sortDirection ?? "BSP"
        });

        return data;
    } catch (error) {
        console.error('Error fetching banners:', error);
        throw error;
    }
};

/**
 * Custom hook to fetch product list using React Query
 * @returns useQuery result with product list
 */
export const useProducts = (params: { keyword: string; page: number; size: number; sortDirection?: string }) => {

    const defaultParams = {
        keyword: params.keyword ?? "",
        page: params.page ?? 0,
        size: params.size ?? 10,
        sortDirection: params.sortDirection ?? "BSP"
    };

    return useQuery<ProductsData>({
        queryKey: ["getProducts", defaultParams],
        queryFn: () => getProducts(defaultParams),
        gcTime: 5 * 60 * 1000, // 5 minutes
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};

/**
 * Custom hook to fetch infinite product list using React Query
 * @returns useInfiniteQuery result with product list
 */
export const useInfiniteProducts = (params: { keyword: string; size: number; sortDirection?: string }) => {

    const defaultParams = {
        keyword: params.keyword ?? "",
        size: params.size ?? 10,
        sortDirection: params.sortDirection ?? "BSP"
    };

    return useInfiniteQuery({
        queryKey: ["getInfiniteProducts", defaultParams],
        queryFn: ({ pageParam = 0 }) => getProducts({ ...defaultParams, page: pageParam as number }),
        getNextPageParam: (lastPage, allPages) => {
            // If it's the last page, return undefined to stop fetching
            if (lastPage.last) {
                return undefined;
            }
            // Return the next page number (current page + 1)
            return allPages.length;
        },
        initialPageParam: 0,
        gcTime: 5 * 60 * 1000, // 5 minutes
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};

/**
 * API function to fetch product detail (no hooks)
 * @returns Promise with product detail
 */
export const getProductDetail = async (params: { productid: string, lineUserId?: string }) => {
    try {
        const { data } = await api.post<ProductDetail>(`/api/pet-store/v1/get-product-detail`, {
            productId: params.productid,
            lineUserId: params.lineUserId ?? ""
        })

        return data;
    } catch (error) {
        console.error('Error fetching banners:', error);
        throw error;
    }
};

/**
 * Custom hook to fetch product list using React Query
 * @returns useQuery result with product list
 */
export const useProductDetail = (params: { productid: string, lineUserId?: string }) => {

    return useQuery<ProductDetail>({
        queryKey: ["getProductDetail", params],
        queryFn: () => getProductDetail(params),
        gcTime: 5 * 60 * 1000, // 5 minutes
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};

/**
 * API function to fetch related products by category (no hooks)
 * @returns Promise with related products list
 */
export const getRelatedProducts = async (params: { productId: string; page: number; size: number }) => {
    try {
        const { data } = await api.post<ProductsData>(`/api/pet-store/v1/same-product-category`, {
            productId: params.productId,
            page: params.page ?? 0,
            size: params.size ?? 10
        });

        return data;
    } catch (error) {
        console.error('Error fetching related products:', error);
        throw error;
    }
};

/**
 * Custom hook to fetch infinite related products using React Query
 * @returns useInfiniteQuery result with related products list
 */
export const useInfiniteRelatedProducts = (params: { productId: string; size: number }) => {
    const defaultParams = {
        productId: params.productId,
        size: params.size ?? 10
    };

    return useInfiniteQuery({
        queryKey: ["getInfiniteRelatedProducts", defaultParams],
        queryFn: ({ pageParam = 0 }) => getRelatedProducts({ ...defaultParams, page: pageParam as number }),
        getNextPageParam: (lastPage, allPages) => {
            // If it's the last page, return undefined to stop fetching
            if (lastPage.last) {
                return undefined;
            }
            // Return the next page number (current page + 1)
            return allPages.length;
        },
        initialPageParam: 0,
        gcTime: 5 * 60 * 1000, // 5 minutes
        staleTime: 2 * 60 * 1000, // 2 minutes
        enabled: !!params.productId, // Only run when productId is provided
    });
};


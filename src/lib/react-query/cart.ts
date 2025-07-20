import { MyCartCountResponse, MyCartData } from "@/types/cart";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
/**
 * API function to fetch getMyCartCount (no hooks)
 * @returns Promise with getMyCartCount
 */
export const getMyCartCount = async (params: { lineUserId: string }) => {
    try {
        const { data } = await api.post<MyCartCountResponse>(`/api/pet-store/v1/get-items-my-cart-total`, {
            lineUserId: params.lineUserId
        });

        return data;
    } catch (error) {
        console.error('Error fetching banners:', error);
        throw error;
    }
};


/**
 * Custom hook to fetch cart count using React Query
 * @returns useQuery result with cart count
 */
export const useMyCartCount = (params: { lineUserId: string; }) => {

    const defaultParams = {
        lineUserId: params.lineUserId,
    };

    return useQuery<MyCartCountResponse>({
        queryKey: ["getMyCartCount", defaultParams],
        queryFn: () => getMyCartCount(defaultParams),
        enabled: !!params.lineUserId && params.lineUserId !== "",
        gcTime: 5 * 60 * 1000, // 5 minutes
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};



/**
 * API function to fetch getMyCartCount (no hooks)
 * @returns Promise with getMyCartCount
 */
export const getMyCartData = async (params: { lineUserId: string }) => {
    try {
        const { data } = await api.post<MyCartData[]>(`/api/pet-store/v1/get-items-my-cart`, {
            lineUserId: params.lineUserId
        });

        return data;
    } catch (error) {
        console.error('Error fetching banners:', error);
        throw error;
    }
};

/**
 * Custom hook to fetch cart count using React Query
 * @returns useQuery result with cart count
 */
export const useMyCart = (params: { lineUserId: string; }) => {

    const defaultParams = {
        lineUserId: params.lineUserId,
    };

    return useQuery<MyCartData[]>({
        queryKey: ["getMyCartData", defaultParams],
        queryFn: () => getMyCartData(defaultParams),
        enabled: !!params.lineUserId && params.lineUserId !== "",
        gcTime: 5 * 60 * 1000, // 5 minutes
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};
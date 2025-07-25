import { AddItemToCart, MyCartCountResponse, MyCartData, DeleteCartItem } from "@/types/cart";
import api from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

/**
 * Interface for updating product favourite request
 */

/**
 * API function to update product favourite (no hooks)
 * @returns Promise with updated  product favourite data
 */
export const addItemToCart = async (params: AddItemToCart) => {
    try {
        const { data } = await api.post<any>(`/api/pet-store/v1/add-items-my-cart`, params);

        return data;
    } catch (error) {
        console.error('Error updating shipping address:', error);
        throw error;
    }
};

/**
 * Custom hook to update product favourite using React Query mutation
 * @returns useMutation result for updating product favourite
 */
export const useAddItemToCart = () => {
    const queryClient = useQueryClient();

    return useMutation<AddItemToCart, Error, AddItemToCart>({
        mutationFn: addItemToCart,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["getMyCartData"],
            });
            queryClient.invalidateQueries({
                queryKey: ["getMyCartCount"],
            });
        },
        onError: (error) => {
            console.error('Failed to update shipping address:', error);
        },
    });
};

/**
 * API function to delete cart item (no hooks)
 * @returns Promise with delete cart item response
 */
export const deleteCartItem = async (params: DeleteCartItem) => {
    try {
        const { data } = await api.delete<any>(`/api/pet-store/v1/delete-items-my-cart`, {
            data: params
        });

        return data;
    } catch (error) {
        console.error('Error deleting cart item:', error);
        throw error;
    }
};

/**
 * Custom hook to delete cart item using React Query mutation
 * @returns useMutation result for deleting cart item
 */
export const useDeleteCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, DeleteCartItem>({
        mutationFn: deleteCartItem,
        onSuccess: (data, variables) => {
            // Invalidate cart queries to refresh the data
            queryClient.invalidateQueries({
                queryKey: ["getMyCartData"],
            });
            queryClient.invalidateQueries({
                queryKey: ["getMyCartCount"],
            });
        },
        onError: (error) => {
            console.error('Failed to delete cart item:', error);
        },
    });
};
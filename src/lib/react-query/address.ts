import { ShippingAddress } from "@/types/address";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

/**
 * API function to fetch getMyAddressData (no hooks)
 * @returns Promise with getMyAddressData
 */
export const getShippingAddressData = async (params: { lineUserId: string }) => {
    try {
        const { data } = await api.post<ShippingAddress>(`/api/pet-store/v1/get-shipping-address`, {
            lineUserId: params.lineUserId
        });

        return data;
    } catch (error) {
        console.error('Error fetching banners:', error);
        throw error;
    }
};

/**
 * Custom hook to fetch useMyAddress using React Query
 * @returns useQuery result with useMyAddress
 */
export const useShippingAddress = (params: { lineUserId: string; }) => {

    const defaultParams = {
        lineUserId: params.lineUserId,
    };

    return useQuery<ShippingAddress>({
        queryKey: ["getShippingAddress", defaultParams],
        queryFn: () => getShippingAddressData(defaultParams),
        enabled: !!params.lineUserId && params.lineUserId !== "",
        gcTime: 5 * 60 * 1000, // 5 minutes
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};
import React from 'react';
import { useDeleteCartItem, useMyCart } from '@/lib/react-query/cart';
import { MyCartData } from '@/types/cart';
import { Button } from './ui/Button';
import { Trash2 } from 'lucide-react';

interface CartItemProps {
    item: MyCartData;
    onDeleteSuccess?: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onDeleteSuccess }) => {
    const deleteCartItemMutation = useDeleteCartItem();

    const handleDelete = async () => {
        try {
            await deleteCartItemMutation.mutateAsync({
                id: item.id
            });
            onDeleteSuccess?.();
        } catch (error) {
            console.error('Failed to delete cart item:', error);
        }
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-4">
                <img
                    src={item.imageUrl || item.imageMainUrl}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded"
                />
                <div>
                    <h3 className="font-medium text-gray-900">{item.productName}</h3>
                    <p className="text-sm text-gray-500">{item.productItemName}</p>
                    {item.productItemQuantityName && (
                        <p className="text-sm text-gray-500">{item.productItemQuantityName}</p>
                    )}
                    <div className="flex items-center space-x-2 mt-1">
                        <span className="text-lg font-semibold text-primary">฿{item.price.toLocaleString()}</span>
                        {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-sm text-disabled line-through">
                                ฿{item.originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-600">จำนวน: {item.quantity}</p>
                </div>
            </div>

            <Button
                onClick={handleDelete}
                disabled={deleteCartItemMutation.isPending}
                variant="outline"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
                {deleteCartItemMutation.isPending ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                ) : (
                    <Trash2 className="w-4 h-4" />
                )}
            </Button>
        </div>
    );
};

// Example usage in a cart component
interface CartListProps {
    lineUserId: string;
}

export const CartList: React.FC<CartListProps> = ({ lineUserId }) => {

    const {
        data: cartItems,
        isLoading,
        isError,
        error
    } = useMyCart({ lineUserId });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <span className="ml-2">กำลังโหลดตะกร้า...</span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center p-8">
                <p className="text-red-500">
                    เกิดข้อผิดพลาดในการโหลดตะกร้า: {error?.message}
                </p>
            </div>
        );
    }

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="text-center p-8">
                <p className="text-gray-500">ตะกร้าสินค้าว่างเปล่า</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">ตะกร้าสินค้า</h2>

            <div className="space-y-3">
                {cartItems.map((item: MyCartData) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onDeleteSuccess={() => {
                            console.log('Item deleted successfully');
                            // You can add additional success handling here
                        }}
                    />
                ))}
            </div>

            <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">รวม:</span>
                    <span className="text-xl font-semibold text-primary">
                        ฿{cartItems.reduce((total: number, item: MyCartData) => total + (item.price * item.quantity), 0).toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
};

// Example of using the hook directly in a component
export const DeleteCartItemExample = () => {
    const deleteCartItemMutation = useDeleteCartItem();

    const handleDeleteItem = async (itemId: number) => {
        try {
            await deleteCartItemMutation.mutateAsync({ id: itemId });
            console.log('Item deleted successfully');
            // Handle success (e.g., show toast, redirect, etc.)
        } catch (error) {
            console.error('Delete failed:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">ลบสินค้าจากตะกร้า</h3>

            <Button
                onClick={() => handleDeleteItem(1)} // Example: delete item with id 1
                disabled={deleteCartItemMutation.isPending}
                variant="outline"
                className="text-red-500 hover:text-red-700"
            >
                {deleteCartItemMutation.isPending ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500 mr-2"></div>
                        กำลังลบ...
                    </>
                ) : (
                    <>
                        <Trash2 className="w-4 h-4 mr-2" />
                        ลบสินค้า
                    </>
                )}
            </Button>

            {deleteCartItemMutation.isError && (
                <p className="text-red-500 mt-2">
                    เกิดข้อผิดพลาด: {deleteCartItemMutation.error?.message}
                </p>
            )}

            {deleteCartItemMutation.isSuccess && (
                <p className="text-green-500 mt-2">
                    ลบสินค้าสำเร็จ!
                </p>
            )}
        </div>
    );
}; 
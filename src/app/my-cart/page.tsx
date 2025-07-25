'use client';

import React, { useState } from 'react';
import { CheckCircle, Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
import { AddressModal, ShippingAddressFormData } from '@/components/form/modal-address';
import CartFooter from '@/components/CartFooter';
import { swal } from '@/components/common/SweetAlert';
import { useRouter } from 'next/navigation';
import { useDeleteCartItem, useMyCart } from '@/lib/react-query/cart';
import { useShippingAddress, useUpdateShippingAddress } from '@/lib/react-query/address';
import { toast, ToastContainer } from 'react-toastify';
import { useSession } from 'next-auth/react';

interface CartItemProps {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    quantity: number;
    color?: string;
    size?: string;
}

export default function MyCartPage() {

    const { push } = useRouter();
    const { data: session } = useSession();

    const lineUserId = session?.user?.id;

    const { data: myCartData } = useMyCart({ lineUserId: lineUserId ?? "" });
    const { data: shippingAddressData } = useShippingAddress({ lineUserId: lineUserId ?? "" });
    const { mutate: updateShippingAddress, isPending: isUpdatingShippingAddress } = useUpdateShippingAddress();
    const { mutate: deleteCartItem } = useDeleteCartItem();

    // Demo cart data
    const [cartItems, setCartItems] = useState<CartItemProps[]>([
        {
            id: '1',
            name: 'O3vet 50 ml ยาทาแผลสุนัข/ยาหยอดหู/ยาทาผิวหนัง/สมุนไพร',
            price: 1050,
            originalPrice: 1250,
            image: '/images/product-demo.png',
            quantity: 1,
            color: 'ม่วง',
        },
        {
            id: '2',
            name: 'O3vet 50 ml ยาทาแผลสุนัข/ยาหยอดหู/ยาทาผิวหนัง/สมุนไพร',
            price: 1050,
            originalPrice: 1250,
            image: '/images/product-demo.png',
            quantity: 1,
            color: 'ส้ม',
        }
    ]);

    // Address modal state
    const [showAddressModal, setShowAddressModal] = useState(false);
    // Calculate totals
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const originalTotal = cartItems.reduce((total, item) => total + (item.originalPrice * item.quantity), 0);
    const totalSavings = originalTotal - subtotal;
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const total = subtotal;

    // Handlers
    const increaseQuantity = (id: number) => {
        setCartItems(cartItems.map(item =>
            item.id === id.toString() ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decreaseQuantity = (id: number) => {
        setCartItems(cartItems.map(item =>
            item.id === id.toString() && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const removeItem = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id.toString()));
        deleteCartItem({ id: id })
    };

    const handleEditAddress = () => {
        setShowAddressModal(true);
    };

    const handleSaveAddress = async (data: ShippingAddressFormData) => {
        updateShippingAddress({
            lineUserId: lineUserId ?? "",
            ...data,
            additionalAddress: data.additionalAddress ?? ""
        }, {
            onSuccess() {
                toast.success('บันทึกสำเร็จ', {
                    icon: <CheckCircle className='w-5 h-5 text-success' />,
                    style: {
                        background: "#F1F9EA",
                        borderRadius: "14px",
                        fontWeight: 600,
                        color: 'black',
                        fontFamily: "notoSansThai"
                    }
                });
            },
            onError() {
                toast.error('พบข้อผิดพลาด', {
                    icon: <X className='w-5 h-5 text-critical' />,
                    style: {
                        background: "#ffc7c7",
                        borderRadius: "14px",
                        fontWeight: 600,
                        color: 'black',
                        fontFamily: "notoSansThai"
                    }
                });
            }
        });
    };

    const handleSendToAdmin = () => {
        // Handle sending cart to admin
        const cartData = {
            items: cartItems,
            totals: {
                subtotal,
                total,
                savings: totalSavings,
                itemCount: totalItems
            }
        };
        console.log('Sending cart to admin:', cartData);
        swal.fire({
            icon: "success",
            title: "สำเร็จ",
            text: "ส่งรายการสินค้าให้แอดมินเรียบร้อยหน้านี้จะถูกปิดลงและพาคุณกลับไปที่ไลน์เพื่อแชทกับแอดมิน",
            confirmButtonText: "ตกลง",

        }).then(async (result) => {
            if (result.isConfirmed) {
                push('/history')
            }
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto space-y-8 py-5 md:px-5 px-3 pb-40">
                {/* Address Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="sm:col-span-1 col-span-2">
                        <div className="bg-white mb-4 p-4 rounded-lg">
                            {
                                shippingAddressData && Object.keys(shippingAddressData).length > 0 ? (
                                    <div className="flex items-start">
                                        <img src="/icons/cart-pin.svg" alt="pin" className="w-5 h-5 lg:w-7 lg:h-7" />
                                        <div className="flex-grow">
                                            <h3 className="font-bold text-base mb-2">ที่อยู่จัดส่ง</h3>
                                            <p className="text-black text-baese font-semibold">{shippingAddressData.recipientFullName}</p>
                                            <p className="text-subdube text-sm">{shippingAddressData.recipientPhoneNumber}</p>
                                            <p className="text-black text-sm">
                                                {shippingAddressData.shippingAddress}
                                                {shippingAddressData.additionalAddress && (
                                                    <>
                                                        <br />
                                                        {shippingAddressData.additionalAddress}
                                                    </>
                                                )}
                                            </p>
                                            <p>

                                            </p>
                                        </div>
                                        <button
                                            className="text-primary text-sm font-medium"
                                            onClick={handleEditAddress}
                                        >
                                            แก้ไข
                                        </button>
                                    </div>
                                )
                                    :
                                    <div className='flex items-center justify-center h-full py-3'>

                                        <button type='button' onClick={handleEditAddress} className="flex items-center gap-x-1">
                                            <Plus className='w-4 h-4' />
                                            <p className='text-primary'>เพิ่มที่อยู่จัดส่ง</p>
                                        </button>
                                    </div>
                            }

                        </div>

                        {/* Cart Items */}
                        {myCartData?.map((item) => (
                            <div key={item.id} className="bg-white mb-4 rounded-lg">
                                <div className="p-4">
                                    <div className="flex items-center mb-2">
                                        <div className="mr-3 w-20 h-20 flex-shrink-0">
                                            <Image
                                                src={item.imageUrl ? item.imageUrl : item.imageMainUrl}
                                                alt={item.productName}
                                                width={80}
                                                height={80}
                                                className="object-contain w-full h-full"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between">
                                                <h3 className="font-medium text-sm line-clamp-2 pr-4">{item.productName}</h3>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    aria-label="Remove item"
                                                >
                                                    <X size={18} className="text-gray-400" />
                                                </button>
                                            </div>
                                            {item.productItemName && <p className="text-sm text-gray-500">{item.productItemName} {item.productItemQuantityName}</p>}
                                            <div className="flex justify-between items-center mt-2">
                                                <div className="text-primary font-bold text-base">฿{item.price ? item.price.toLocaleString() : 0}</div>
                                                <div className="flex items-center justify-end gap-x-2">
                                                    <button
                                                        onClick={() => decreaseQuantity(item.id)}
                                                        className="w-10 h-10 text-white bg-secondary rounded-full flex items-center justify-center hover:bg-gray-800"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={item.quantity}
                                                        onChange={(e) => {
                                                            const value = parseInt(e.target.value) || 1;
                                                            if (value > 0) {
                                                                setCartItems(cartItems.map(cartItem =>
                                                                    cartItem.id === item.id.toString() ? { ...cartItem, quantity: value } : cartItem
                                                                ));
                                                            }
                                                        }}
                                                        className="w-10 text-center border-none bg-white outline-none"
                                                    />
                                                    <button
                                                        onClick={() => increaseQuantity(item.id)}
                                                        className="w-10 h-10 text-white bg-secondary rounded-full flex items-center justify-center hover:bg-gray-800"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="sm:col-span-1 col-span-2">
                        {/* Order Summary */}
                        <div className="bg-white mb-4 p-4 rounded-lg">
                            <h3 className="font-bold text-base mb-3">สรุปค่าสั่งซื้อ</h3>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">รวมค่าสั่งซื้อ</span>
                                <span className="font-medium">฿{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between mb-2 text-gray-500">
                                <span>ไม่รวมค่าจัดส่ง</span>
                                <span>-</span>
                            </div>
                            <div className="border-t border-gray-200 my-2 pt-2">
                                <div className="flex justify-between font-bold">
                                    <span>ยอดรวมทั้งหมด</span>
                                    <span className="text-primary">฿{total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Modal */}
                <AddressModal
                    open={showAddressModal}
                    shippingAddressData={shippingAddressData}
                    onClose={() => setShowAddressModal(false)}
                    onSave={handleSaveAddress}

                />
            </div>

            {/* Cart Footer */}
            <CartFooter
                totalSavings={totalSavings}
                onSendToAdmin={handleSendToAdmin}
                totalItems={totalItems}
                totalAmount={total}
            />
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
        </div>
    );
}

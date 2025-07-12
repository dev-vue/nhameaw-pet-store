'use client';

import React, { useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
import { AddressModal, AddressFormData } from '@/components/form/modal-address';
import CartFooter from '@/components/CartFooter';
import { swal } from '@/components/common/SweetAlert';
import { useRouter } from 'next/navigation';

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
    const [addressData, setAddressData] = useState<AddressFormData>({
        recipientName: "โรงพยาบาลสัตว์",
        phoneNumber: "099-888-9999",
        address: "100/847 ต.23/1/หมู่บ้านสามขวา ตำบลบางพลัด อำเภอบ้านดอน จังหวัดกรุงเทพ 11120",
        additionalInfo: "",
    });

    // Calculate totals
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const originalTotal = cartItems.reduce((total, item) => total + (item.originalPrice * item.quantity), 0);
    const totalSavings = originalTotal - subtotal;
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const total = subtotal;

    // Handlers
    const increaseQuantity = (id: string) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decreaseQuantity = (id: string) => {
        setCartItems(cartItems.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const removeItem = (id: string) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleEditAddress = () => {
        setShowAddressModal(true);
    };

    const handleSaveAddress = (data: AddressFormData) => {
        setAddressData(data);
        console.log('Address saved:', data);
    };

    const handleSendToAdmin = () => {
        // Handle sending cart to admin
        const cartData = {
            items: cartItems,
            address: addressData,
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
        <div className="bg-gray-100 max-h-screen overflow-auto">
            <div className="container mx-auto space-y-8 py-5 md:px-5 px-3 pb-32">
                {/* Address Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="sm:col-span-1 col-span-2">
                        <div className="bg-white mb-4 p-4 rounded-lg">
                            <div className="flex items-start">
                                <img src="/icons/pin-map.png" alt="Shield" className="w-5 h-5 lg:w-6 lg:h-6" />
                                <div className="flex-grow">
                                    <h3 className="font-bold text-base mb-2">ที่อยู่จัดส่ง</h3>
                                    <p className="text-gray-600 text-sm">
                                        {addressData.phoneNumber}<br />
                                        {addressData.address}
                                        {addressData.additionalInfo && (
                                            <>
                                                <br />
                                                {addressData.additionalInfo}
                                            </>
                                        )}
                                    </p>
                                </div>
                                <button
                                    className="text-primary text-sm font-medium"
                                    onClick={handleEditAddress}
                                >
                                    แก้ไข
                                </button>
                            </div>
                        </div>

                        {/* Cart Items */}
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white mb-4 rounded-lg">
                                <div className="p-4">
                                    <div className="flex items-center mb-2">
                                        <div className="mr-3 w-20 h-20 flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={80}
                                                height={80}
                                                className="object-contain w-full h-full"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between">
                                                <h3 className="font-medium text-sm line-clamp-2 pr-4">{item.name}</h3>
                                                <button onClick={() => removeItem(item.id)} aria-label="Remove item">
                                                    <X size={18} className="text-gray-400" />
                                                </button>
                                            </div>
                                            {item.color && <p className="text-sm text-gray-500">{item.color} 1 กล่อง(บรรจุภัณฑ์)</p>}
                                            <div className="flex justify-between items-center mt-2">
                                                <div className="text-primary font-bold text-base">฿{item.price.toLocaleString()}</div>
                                                <div className="flex items-center justify-end gap-x-2">
                                                    <button
                                                        onClick={() => decreaseQuantity(item.id)}
                                                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
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
                                                                setCartItems(cartItems.map(item =>
                                                                    item.id === item.id ? { ...item, quantity: value } : item
                                                                ));
                                                            }
                                                        }}
                                                        className="w-10 text-center border-none bg-white outline-none"
                                                    />
                                                    <button
                                                        onClick={() => increaseQuantity(item.id)}
                                                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
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
        </div>
    );
}

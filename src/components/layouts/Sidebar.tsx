'use client';

import { Heart, Home, Info, X, LogOut, PackageCheck, UserCircle } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Loading from "../common/Loading";
import Image from "next/image";
import { useState } from "react";
import Modal from "../common/Modal";
import { useRouter } from "next/navigation";
import { AccountModal } from "../form/modal-account";
import { Button } from "../ui/Button";



const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {

    const { data: session, status } = useSession()
    const [myAccountModal, setMyAccountModal] = useState(false);
    const { push } = useRouter()

    async function SignIn() {
        await signIn("line");
    }

    if (status === "loading") {
        return <Loading />;
    }

    async function myAccount() {
        // if (!session) signIn("line");
        setMyAccountModal(true)
    }

    const menuItems = [
        {
            icon: <Home className="h-6 w-6 mr-4" />,
            label: 'หน้าหลัก',
            onClick: () => {
                onClose();
                push('/');
            }
        },
        {
            icon: <UserCircle className="h-6 w-6 mr-4" />,
            label: 'บัญชีของฉัน',
            onClick: () => {
                onClose();
                myAccount()
            }
        },
        {
            icon: <Heart className="h-6 w-6 mr-4" />,
            label: 'รายการที่ถูกใจ',
            onClick: () => {
                onClose();
                push('/favourite');
            }
        },
        {
            icon: <PackageCheck className="h-6 w-6 mr-4" />,
            label: 'รายการสินค้าที่เคยส่งให้แอดมิน',
            onClick: () => {
                onClose();
                push('/history');
            }
        },
        {
            icon: <Info className="h-6 w-6 mr-4" />,
            label: 'วิธีสั่งสินค้า',
            onClick: () => {
                onClose();
                push('/how-to-order');
            }
        },
        {
            icon:
                <div className="relative h-6 w-6 mr-4">
                    <Image src={'/images/contact-nhamaew.png'} alt={"contact-nhamaew"} layout="fill" objectFit="cover" />
                </div>,
            label: 'ช่องทางติดต่อหน้าแมว',
            onClick: () => {
                onClose();
                window.open("https://www.facebook.com/nhamaew", "_blank", "noopener,noreferrer");
            }
        },
    ]

    return (
        <div className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}>
            <div
                className={`
                    fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 flex flex-col
                    w-full max-w-[100vw] md:w-xl
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-end items-center p-4">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 flex items-center">
                        <X className="h-6 w-6" />
                        <span className="ml-2">ปิด</span>
                    </button>
                </div>

                <div className="md:px-20 px-4">
                    <div className="bg-primary-light rounded-[20px] p-4">
                        {!session ?
                            <Button size="md" className="w-full" onClick={SignIn}>
                                เข้าสู่ระบบ/สมัครสมาชิก
                            </Button>
                            :
                            <div className="flex gap-3">
                                <Image src={'/images/profile-demo.png'} className="rounded-[10px]" width={50} height={50} alt="img-profile" />
                                <div className="flex flex-col items-start justify-center">
                                    <h3 className="font-semibold text-xl">
                                        21BE
                                    </h3>
                                    {/* <p className="text-subdube text-sm">
                                        อนุกูล อุดมวงศ์
                                    </p> */}
                                </div>
                            </div>
                        }

                    </div>
                </div>

                {
                    session &&
                    <div className="md:px-20 px-4">
                        <div className="flex items-center space-x-4 bg-pink-50 p-3 rounded-lg">
                            <div className="w-12 h-12 rounded-full bg-purple-200 flex-shrink-0">
                                {/* Placeholder for avatar */}
                            </div>
                            <div>
                                <p className="font-semibold">{session?.user?.name}</p>
                            </div>
                        </div>
                    </div>
                }

                <nav className="flex-grow md:px-20 px-4 space-y-2 mt-5">
                    {menuItems.map(item => (
                        <button
                            key={item.label}
                            type="button"
                            onClick={item.onClick}
                            className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100 w-full text-left"
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                    <hr className="border-gray-light px-3" />
                    <button type="button" onClick={() => signOut()} className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100">
                        <LogOut className="h-6 w-6 mr-4" />
                        <span>ออกจากระบบ</span>
                    </button>
                </nav>
            </div>

            <Modal
                header="บัญชีของฉัน"
                open={myAccountModal}
                onClose={() => setMyAccountModal(false)}
            >
                <AccountModal
                    open={myAccountModal}
                    onClose={() => setMyAccountModal(false)}
                />
            </Modal>
        </div>


    );
};

export default Sidebar; 
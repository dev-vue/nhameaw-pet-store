import React from 'react';
import AccordionItem from './AccordionItem';
import { Product } from '@/constants/mockData';

interface ProductAccordionProps {
    productDetails: Product;
}

const ProductAccordion: React.FC<ProductAccordionProps> = ({ productDetails }) => {
    const {
        name,
        sku = '',
        description = '',
        instructions = '',
        suitableFor,
        ingredients,
        additionalInfo
    } = productDetails;

    return (
        <div className="bg-white divide-y divide-gray-200">
            <AccordionItem title="เกี่ยวกับสินค้า" defaultOpen={true}>
                <p className="text-sm text-gray-700">{description}</p>
            </AccordionItem>

            <AccordionItem title="รายละเอียดสินค้า">
                <div className="space-y-2 text-sm text-gray-700">
                    <p>เลขทะเบียนอาหารสัตว์ : {sku}</p>
                    <p>O3 vit ชนิดน้ำ ขนาดบรรจุ : 50 ml./ขวด ชนิดน้ำ</p>
                    <p>** ขวดส้ม สำหรับสุนัข</p>
                    <p>** ขวดฟ้า สำหรับแมว</p>
                    <p>สำหรับสุนัขแมวอายุ 3 เดือน ขึ้นไป</p>
                    <p>* เก็บลูกหมูปีปกติ ไม่ต้องแช่เย็น</p>
                    <p>วิธีใช้ : ให้กินวันละ 1 ml / น้ำหนัก แมว/สุนัข 1 กก.</p>
                    <p>กินพร้อมอาหารหรือพร้อมอาหาร</p>
                    <p>ป้องให้กินโดยตรง หรือผสมในอาหาร</p>
                </div>
            </AccordionItem>

            {suitableFor && (
                <AccordionItem title="สินค้าเหมาะสำหรับ">
                    <p className="text-sm text-gray-700">{suitableFor}</p>
                </AccordionItem>
            )}

            {ingredients && (
                <AccordionItem title="ส่วนประกอบ/ส่วนผสม">
                    <p className="text-sm text-gray-700">{ingredients}</p>
                </AccordionItem>
            )}

            {additionalInfo && Object.keys(additionalInfo).map((key, index) => (
                <AccordionItem key={index} title={`เกี่ยวกับสินค้า ${String(key).padStart(2, '0')}`}>
                    <p className="text-sm text-gray-700">{additionalInfo[key]}</p>
                </AccordionItem>
            ))}
        </div>
    );
};

export default ProductAccordion; 
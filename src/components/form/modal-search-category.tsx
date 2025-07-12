import { useEffect, useState } from "react";
import Modal from "@/components/common/Modal";
import { Button } from "../ui/Button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Loading from "../common/Loading";

export type Category = {
    id: number;
    name: string;
    parentId?: number;
    hasSubcategories?: boolean;
};

export type SearchCategoryModalProps = {
    id: number;
    name: string;
    open: boolean;
    onClose: () => void;
};

// Mock category data structure - in real app this would come from API
const mockCategoryData: Record<number, Category[]> = {
    // Main categories (level 0)
    0: [
        { id: 1, name: "น้องแมว", hasSubcategories: true },
        { id: 2, name: "น้องหมา", hasSubcategories: true },
        { id: 3, name: "น้องกระต่าย", hasSubcategories: true },
        { id: 4, name: "น้องนก", hasSubcategories: true }
    ],
    // Cat subcategories (level 1)
    1: [
        { id: 101, name: "อาหารสุดสุขป้องกันโรค (Care)", parentId: 1, hasSubcategories: false },
        { id: 102, name: "อาหารสุดสร้างโรค", parentId: 1, hasSubcategories: false },
        { id: 103, name: "ความดังและยิน (โรคความดัง/เอ็อร์ส /ฮัสส์/แบคทีรีย)", parentId: 1, hasSubcategories: false },
        { id: 104, name: "แก้ปัญหาความเครียดหรือวิตกกังวล", parentId: 1, hasSubcategories: false },
        { id: 105, name: "ผลิตภัณฑ์การดูแลขนหนู", parentId: 1, hasSubcategories: false },
        { id: 106, name: "แก้ปัญหาก้อนนม (Hairballs)", parentId: 1, hasSubcategories: false },
        { id: 107, name: "ผลิตภัณฑ์ดูแลแผลและการปฐมพยาบาลเบื้องต้น", parentId: 1, hasSubcategories: false },
        { id: 108, name: "อาหารเสริม", parentId: 1, hasSubcategories: true }, // Has subcategories
        { id: 109, name: "ผลิตภัณฑ์สำหรับแม่แมวป่วย/พักฟื้น (Recovery)", parentId: 1, hasSubcategories: false },
        { id: 110, name: "ผลิตภัณฑ์สำหรับแม่แมวและลูกแมว", parentId: 1, hasSubcategories: false }
    ],
    // Food supplement subcategories (level 2)
    108: [
        { id: 1081, name: "อาหารเสริมบำรุงโดน", parentId: 108, hasSubcategories: true },
        { id: 1082, name: "อาหารเสริมบำรุงขน", parentId: 108, hasSubcategories: false },
        { id: 1083, name: "อาหารเสริมระบบการเดินอาหาร", parentId: 108, hasSubcategories: false },
        { id: 1084, name: "อาหารเสริมกระดูกข้อต่อ", parentId: 108, hasSubcategories: false },
        { id: 1085, name: "อาหารเสริมบำรุงสมอง", parentId: 108, hasSubcategories: false },
        { id: 1086, name: "อาหารเสริมบำรุงหัวใจ", parentId: 108, hasSubcategories: false },
        { id: 1087, name: "อาหารเสริมบำรุงกระดูกและข้อ", parentId: 108, hasSubcategories: false }
    ],
    // Level 3 example
    1081: [
        { id: 10811, name: "โดย่าย", parentId: 1081, hasSubcategories: false },
        { id: 10812, name: "โดบวง", parentId: 1081, hasSubcategories: false }
    ]
};

// Mock function to get subcategories by parent ID
const getSubcategoriesByParentId = async (parentId: number): Promise<Category[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return mockCategoryData[parentId] || [];
};

// Mock function to get category by ID
// const getCategoryById = (categoryId: number): Category | null => {
//     // Flatten all categories from all levels
//     const allCategories = Object.values(mockCategoryData).flat();

//     // Find category by ID
//     return allCategories.find(cat => cat.id === categoryId) || null;
// };

// Find category in subcategories by ID
const findCategoryInSubcategories = (categoryId: number, subcategories: Category[]): Category | null => {
    return subcategories.find(cat => cat.id === categoryId) || null;
};


export function SearchCategoryModal({ id, name, open, onClose }: SearchCategoryModalProps) {

    const { push } = useRouter();
    const [currentCategory, setCurrentCategory] = useState<Category>({ id: id, name: name });
    const [subcategories, setSubcategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [navigationStack, setNavigationStack] = useState<Category[]>([]);

    // Update category when props change
    useEffect(() => {
        if (open && name) {
            const initialCategory = { id: id, name: name };
            setCurrentCategory(initialCategory);
            setNavigationStack([]);
            loadSubcategories(id);
        }
    }, [open, name, id]);

    const loadSubcategories = async (categoryId: number) => {
        setLoading(true);
        try {
            const subs = await getSubcategoriesByParentId(categoryId);
            setSubcategories(subs);
        } catch (error) {
            console.error('Error loading subcategories:', error);
            setSubcategories([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubcategoryClick = async (subcategory: Category) => {
        if (subcategory.hasSubcategories) {
            // Navigate to subcategory
            setNavigationStack(prev => [...prev, currentCategory]);
            setCurrentCategory(subcategory);
            await loadSubcategories(subcategory.id);
        } else {
            // This is a leaf category - handle product view
            handleViewAllProducts(subcategory.id);
        }
    };

    const handleBackClick = async () => {
        if (navigationStack.length > 0) {
            const previousCategory = navigationStack[navigationStack.length - 1];
            setNavigationStack(prev => prev.slice(0, -1));
            setCurrentCategory(previousCategory);
            await loadSubcategories(previousCategory.id);
        }
    };

    const handleViewAllProducts = (categoryId?: number) => {
        if (categoryId !== null && categoryId !== 0 && categoryId !== undefined) {
            const category = findCategoryInSubcategories(categoryId, subcategories);
            push(`/search?searchtext=${category?.name}`)
        } else {
            push(`/search?searchtext=${currentCategory.name}`)
        }
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} header="หมวดหมู่สินค้า" size="md">
            <div className="flex flex-col h-screen">
                {/* Navigation Header */}
                <div className="flex items-center justify-between bg-primary-light rounded-full p-4 mb-4">
                    <div className="flex items-center space-x-2">
                        {navigationStack.length > 0 && (
                            <button
                                onClick={handleBackClick}
                                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/50 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 text-black" />
                            </button>
                        )}
                        <p className="text-black font-semibold text-base">{currentCategory.name}</p>
                    </div>
                    <Button size="sm" onClick={() => handleViewAllProducts()} className="text-sm">
                        ดูสินค้าทั้งหมด
                    </Button>
                </div>

                {/* Subcategories List */}
                <div className="flex-1 overflow-y-auto">
                    {loading && (
                        <div className="text-center py-8">
                            <Loading />
                        </div>
                    )}

                    {!loading && subcategories.length > 0 && (
                        <div className="space-y-0">
                            {subcategories.map((subcategory) => (
                                <button
                                    key={subcategory.id}
                                    onClick={() => handleSubcategoryClick(subcategory)}
                                    className="w-full grid grid-cols-[1fr_auto] items-center gap-4 p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                                >
                                    <span className="text-black text-md font-semibold">
                                        {subcategory.name}
                                    </span>
                                    <div className="flex items-center space-x-2 flex-shrink-0">
                                        <span className="text-base text-secondary whitespace-nowrap">
                                            ดูเพิ่มเติม
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-primary" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && subcategories.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500">ไม่พบหมวดหมู่ย่อย</p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}

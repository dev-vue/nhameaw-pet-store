// Filter Types และ Enums
export enum ProductSortType {
    BEST_SELLING = 'BEST_SELLING',
    LATEST = 'LATEST',
    PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH',
    PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW'
}

export enum GenderType {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

export enum PetType {
    CAT = 'cat',
    DOG = 'dog',
    RABBIT = 'rabbit',
    BIRD = 'bird'
}

// Filter Options
export const PRODUCT_FILTER_OPTIONS = [
    {
        label: 'สินค้าขายดี',
        value: ProductSortType.BEST_SELLING
    },
    {
        label: 'ล่าสุด',
        value: ProductSortType.LATEST
    },
    {
        label: 'ราคาต่ำ>สูง',
        value: ProductSortType.PRICE_LOW_TO_HIGH
    },
    {
        label: 'ราคาสูง>ต่ำ',
        value: ProductSortType.PRICE_HIGH_TO_LOW
    }
] as const;

export const GENDER_OPTIONS = [
    {
        label: 'ชาย',
        value: GenderType.MALE
    },
    {
        label: 'หญิง',
        value: GenderType.FEMALE
    },
    {
        label: 'อื่นๆ',
        value: GenderType.OTHER
    }
];

// Helper functions
export const getProductFilterLabels = () => PRODUCT_FILTER_OPTIONS.map(option => option.label);

export const getProductFilterByValue = (value: ProductSortType) =>
    PRODUCT_FILTER_OPTIONS.find(option => option.value === value);

export const getGenderByValue = (value: GenderType) =>
    GENDER_OPTIONS.find(option => option.value === value);

// Legacy support - สำหรับ backward compatibility
export const filters = getProductFilterLabels();

// Type exports
export type ProductFilterOption = typeof PRODUCT_FILTER_OPTIONS[number];
export type GenderOption = typeof GENDER_OPTIONS[number]; 
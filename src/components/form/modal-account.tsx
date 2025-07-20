import { useState } from "react";
import Modal from "../common/Modal";
import { CalendarIcon, User } from "lucide-react";
import Input from "@/components/ui/Input";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { cn, convertDateToThai } from "@/utils/helpers";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Popover from "@/components/common/Popover";
import { Calendar } from "@/components/ui/Calendar";
import { Combobox } from "../common/Combobox";

export type AccountModalProps = {
    open: boolean;
    onClose: () => void;
};

import { GENDER_OPTIONS } from "@/constants";

const formSchema = z.object({
    gender: z.string({ required_error: "กรุณาระบุเพศ" }).min(1, { message: "กรุณาระบุเพศ" }),
    dob: z.date({ required_error: "กรุณาระบุวันเกิด" }).nullish()
});

type FormData = z.infer<typeof formSchema>;

const defaultValues: Partial<FormData> = {
    gender: "",
    dob: undefined
};

export function AccountModal({ open, onClose }: AccountModalProps) {
    const [name] = useState("W3DDE");

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const onSubmit = (data: FormData) => {
        console.log('data', data)
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value) {
            form.setValue('dob', new Date(value));
        } else {
            form.setValue('dob', undefined);
        }
    };

    const formatDateForInput = (date: Date | undefined) => {
        if (!date) return '';
        return date.toISOString().split('T')[0];
    };

    return (
        <Modal open={open} onClose={onClose} header="บัญชีของฉัน" size="md">
            <div className="flex flex-col h-full">
                {/* Form Content */}
                <div className="flex-1 flex flex-col">
                    <Form {...form}>
                        <form
                            className="flex flex-col items-center w-full h-full"
                            onSubmit={form.handleSubmit((data) => onSubmit(data))}
                        >
                            {/* Avatar */}
                            <div className="flex flex-col items-center w-full">
                                <div className="relative w-24 h-24 rounded-full flex items-center justify-center mb-6 mt-2 shadow-sm">
                                    <User className="w-12 h-12 " />
                                </div>
                            </div>

                            {/* Form Fields - Scrollable content */}
                            <div className={cn(
                                "w-full flex flex-col gap-4",
                                // Add padding bottom on mobile only to prevent content being hidden behind fixed buttons
                                "pb-24 md:pb-0"
                            )}>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel isRequired>เพศ</FormLabel>
                                                {/* <Combobox
                                                    options={GENDER_OPTIONS}
                                                    placeholder="เลือกเพศ"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    isError={form.formState.errors.gender}
                                                /> */}
                                                <div className="relative w-full">
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                                                        <User className="h-4 w-4 text-gray-400" />
                                                    </span>
                                                    <select
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        className={cn(
                                                            "w-full rounded-lg border border-gray-200 px-4 py-2 text-base focus:outline-none pl-10",
                                                            "flex items-center justify-start text-left",
                                                            // Error styles
                                                            form.formState.errors.gender && "border-red-500 focus:ring-red-500 focus:border-red-500",
                                                            // Hide default calendar icon and use custom one
                                                            "hide-date-icon")}
                                                    >
                                                        {
                                                            GENDER_OPTIONS.map((option) => (
                                                                <option key={option.value} value={option.value}>{option.label}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div>
                                    <FormField
                                        control={form.control}
                                        name="dob"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel isRequired>วันเกิด</FormLabel>
                                                <div className="relative w-full">
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                                                        <CalendarIcon className="h-4 w-4 text-gray-400" />
                                                    </span>

                                                    {/* Mobile: Native Date Input styled like desktop button */}
                                                    <div className="relative">
                                                        <input
                                                            type="date"
                                                            value={formatDateForInput(field.value ?? undefined)}
                                                            onChange={handleDateChange}
                                                            className={cn(
                                                                "w-full rounded-lg border border-gray-200 px-4 py-2 text-base focus:outline-none pl-10",
                                                                "flex items-center justify-start text-left",
                                                                // Error styles
                                                                form.formState.errors.dob && "border-red-500 focus:ring-red-500 focus:border-red-500",
                                                                // Hide default calendar icon and use custom one
                                                                "hide-date-icon",
                                                                // Text color based on selection
                                                                field.value ? "text-gray-900" : "text-gray-500"
                                                            )}
                                                        />
                                                        {/* Placeholder text overlay when no date selected */}
                                                        {/* {!field.value && (
                                                            <div className="absolute inset-0 flex items-center justify-start pl-10 pointer-events-none">
                                                                <span className="text-gray-500 text-base">เลือกวันเกิด</span>
                                                            </div>
                                                        )} */}
                                                    </div>

                                                    {/* Desktop: Custom Calendar Popup */}
                                                    {/* <div className="hidden md:block">
                                                        <Popover
                                                            type="calendar"
                                                            trigger={
                                                                <button
                                                                    type="button"
                                                                    className={cn(
                                                                        // Base styles matching Input and Combobox
                                                                        "w-full rounded-lg border border-gray-200 px-4 py-2 text-base focus:outline-none",
                                                                        "flex items-center justify-start text-left pl-10",
                                                                        // Placeholder/text color
                                                                        !field.value ? "text-gray-500" : "text-gray-900",
                                                                        // Error styles
                                                                        form.formState.errors.dob && "border-red-500 focus:ring-red-500 focus:border-red-500"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        convertDateToThai(field.value, "dd MMMM yyyy")
                                                                    ) : (
                                                                        "เลือกวันเกิด"
                                                                    )}
                                                                </button>
                                                            }
                                                            side="bottom"
                                                        >
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value ? field.value : undefined}
                                                                onSelect={field.onChange}
                                                            />
                                                        </Popover>
                                                    </div> */}
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {/* Mobile: Fixed at bottom of screen */}
                            <div className={cn(
                                "md:hidden",
                                "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 z-50"
                            )}>
                                <div className="flex w-full gap-4">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="md"
                                        onClick={onClose}
                                        className="flex-1"
                                    >
                                        ยกเลิก
                                    </Button>
                                    <Button
                                        type="submit"
                                        size="md"
                                        className="flex-1"
                                    >
                                        บันทึก
                                    </Button>
                                </div>
                            </div>

                            {/* Desktop: Inline buttons */}
                            <div className="hidden md:flex w-full max-w-md mx-auto gap-4 mt-8">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="md"
                                    onClick={onClose}
                                    className="flex-1"
                                >
                                    ยกเลิก
                                </Button>
                                <Button
                                    type="submit"
                                    size="md"
                                    className="flex-1"
                                >
                                    บันทึก
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
}

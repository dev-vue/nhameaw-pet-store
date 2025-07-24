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
import { useLineProfile, useRegisterUpdateProfile } from "@/lib/react-query/user";
import { useSession } from "next-auth/react";
import { GENDER_OPTIONS } from "@/constants";
import { LineProfileData } from "@/types/user";

export type AccountModalProps = {
    open: boolean;
    onClose: () => void;
    profileData?: LineProfileData
};

const formSchema = z.object({
    gender: z.string({ required_error: "กรุณาระบุเพศ" }).min(1, { message: "กรุณาระบุเพศ" }),
    dob: z.date({ required_error: "กรุณาระบุวันเกิด" }).nullish()
});

type FormData = z.infer<typeof formSchema>;

export function AccountModal({ open, onClose, profileData }: AccountModalProps) {

    const { data: session } = useSession();
    const { mutate: updateProfile, isPending: updatingProfilePending } = useRegisterUpdateProfile();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            gender: profileData?.gender ?? "",
            dob: profileData?.birthDate ? new Date(profileData?.birthDate) : undefined
        },
    });

    const onSubmit = (data: FormData) => {
        if (!session?.user?.id || !session?.user?.image) {
            console.error('Missing required session data');
            return;
        }

        // Format date to string (DD-MM-YYYY format)
        const birthDate = data.dob
            ? `${String(data.dob.getDate()).padStart(2, '0')}-${String(data.dob.getMonth() + 1).padStart(2, '0')}-${data.dob.getFullYear()}`
            : '';

        updateProfile({
            lineUserId: session.user.id,
            displayName: session.user.name ?? "",
            pictureUrl: session.user.image,
            gender: data.gender,
            birthDate: birthDate
        }, {
            onSuccess: (response) => {
                console.log('Profile updated successfully:', response);
                onClose(); // Close modal on success
            },
            onError: (error) => {
                console.error('Failed to update profile:', error);
                // You can add toast/alert notification here if needed
            }
        });
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
                                    {
                                        session ?
                                            <img src={session?.user?.image ?? ""} alt="" className="w-full h-full object-cover rounded-full" />
                                            :
                                            <User className="w-12 h-12 " />
                                    }
                                </div>
                            </div>

                            {/* Form Fields - Scrollable content */}
                            <div className={cn(
                                "w-full flex flex-col gap-4",
                                // Add padding bottom on mobile only to prevent content being hidden behind fixed buttons
                                "pb-24 md:pb-0"
                            )}>

                                <div>
                                    <FormItem>
                                        <FormLabel isRequired>
                                            ชื่อไลน์
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            value={session?.user.name ?? ""}
                                            disabled
                                        />
                                        <FormMessage />
                                    </FormItem>
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel isRequired>เพศ</FormLabel>
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
                                                    </div>
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
                                        disabled={updatingProfilePending}
                                    >
                                        {updatingProfilePending ? 'กำลังบันทึก...' : 'บันทึก'}
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
                                    disabled={updatingProfilePending}
                                >
                                    {updatingProfilePending ? 'กำลังบันทึก...' : 'บันทึก'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
}

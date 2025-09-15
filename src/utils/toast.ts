import toast, { type ToastOptions } from "react-hot-toast";

/**
 * Custom toast utility functions with predefined styling
 */
export const customToast = {
    success: (message: string, options?: ToastOptions) => {
        return toast.success(message, {
            className: "custom-toast success-toast",
            ...options,
        });
    },

    error: (message: string, options?: ToastOptions) => {
        return toast.error(message, {
            className: "custom-toast error-toast",
            ...options,
        });
    },

    loading: (message: string, options?: ToastOptions) => {
        return toast.loading(message, {
            className: "custom-toast",
            ...options,
        });
    },
};

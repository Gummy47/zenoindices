import { type ReactNode, useEffect } from "react";
import "./Modal.scss";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    size?: "small" | "medium" | "large";
    closeOnOverlayClick?: boolean;
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = "medium",
    closeOnOverlayClick = true,
}: ModalProps) {
    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscKey);
            // Prevent body scroll when modal is open
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscKey);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={closeOnOverlayClick ? onClose : undefined}>
            <div
                className={`modal-content modal-${size}`}
                onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button
                        className="modal-close-button"
                        onClick={onClose}
                        aria-label="Close modal">
                        ×
                    </button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
}

import { createContext, useContext, useState, type ReactNode, useCallback } from 'react';
import Modal from '../components/Modal';

interface ModalConfig {
    title: string;
    content: ReactNode;
    size?: "small" | "medium" | "large" | "xlarge";
    closeOnOverlayClick?: boolean;
}

interface ModalContextType {
    openModal: (config: ModalConfig) => void;
    closeModal: () => void;
    isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
    children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);

    const openModal = useCallback((config: ModalConfig) => {
        setModalConfig(config);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        // Clear config after animation completes
        setTimeout(() => setModalConfig(null), 200);
    }, []);

    return (
        <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
            {children}
            {modalConfig && (
                <Modal
                    isOpen={isOpen}
                    onClose={closeModal}
                    title={modalConfig.title}
                    size={modalConfig.size}
                    closeOnOverlayClick={modalConfig.closeOnOverlayClick}
                >
                    {modalConfig.content}
                </Modal>
            )}
        </ModalContext.Provider>
    );
}

/**
 * Hook to use the global modal system
 * 
 * @example
 * const { openModal, closeModal } = useGlobalModal();
 * 
 * const handleOpenForm = () => {
 *   openModal({
 *     title: "Add Company",
 *     content: <AddCompanyForm onSuccess={closeModal} />,
 *     size: "large",
 *     closeOnOverlayClick: false
 *   });
 * };
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useGlobalModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useGlobalModal must be used within a ModalProvider');
    }
    return context;
}
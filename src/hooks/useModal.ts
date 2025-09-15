import { useState, useCallback } from 'react';

interface UseModalReturn {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    toggleModal: () => void;
}

/**
 * Custom hook for managing modal state
 * 
 * @param initialState - Initial state of the modal (default: false)
 * @returns Object with modal state and control functions
 * 
 * @example
 * const { isOpen, openModal, closeModal } = useModal();
 * 
 * // In JSX:
 * <button onClick={openModal}>Open Modal</button>
 * <Modal isOpen={isOpen} onClose={closeModal}>...</Modal>
 */
export function useModal(initialState: boolean = false): UseModalReturn {
    const [isOpen, setIsOpen] = useState(initialState);

    const openModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleModal = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    return {
        isOpen,
        openModal,
        closeModal,
        toggleModal
    };
}
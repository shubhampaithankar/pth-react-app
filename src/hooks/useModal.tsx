import { useRef, useCallback } from 'react'
import { UseModal } from '../utils/Types'

export default function useModal(): UseModal {
    const dialogRef = useRef<HTMLDialogElement>(null)

    const openModal = useCallback(() => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }, [])

    const closeModal = useCallback(() => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }, [])

    const Dialog: React.FC<{
        children: React.ReactNode;
        title: string;
        footer?: React.ReactNode;
    }> = ({ children, title, footer }) => {
        return (
            <dialog
                ref={dialogRef}
                className="modal p-0 rounded-lg shadow-xl bg-white max-w-lg w-full overflow-hidden"
            >
                <style>
                    {`
                    dialog::backdrop {
                        background-color: rgba(0, 0, 0, 0.5);
                    }
                `}
                </style>
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Close modal"
                    >
              &times;
                    </button>
                </div>
    
                {/* Modal Content */}
                <div className="p-4">{children}</div>
    
                {/* Modal Footer (Optional) */}
                {footer && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                        {footer}
                    </div>
                )}
            </dialog>
        )
    }

    return {
        openModal,
        closeModal,
        Dialog,
    }
}
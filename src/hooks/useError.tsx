import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react'

export type ErrorBoundaryContextType = {
    hasError: boolean;
    error: Error | null;
    handleError: (error: Error) => void;
    resetError: () => void;
}

export const ErrorBoundaryContext = createContext<ErrorBoundaryContextType>({
    hasError: false,
    error: null,
    handleError: () => {},
    resetError: () => {}
})

export const ErrorBoundary = ({ children }: { children: ReactNode }) => {
    const [hasError, setHasError] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const handleError = useCallback((error: Error) => {
        console.error('Error caught by ErrorBoundary:', error)
        setHasError(true)
        setError(error)
    }, [])

    const resetError = useCallback(() => {
        setHasError(false)
        setError(null)
    }, [])

    useEffect(() => {
        const errorHandler = (event: ErrorEvent) => {
            event.preventDefault()
            handleError(event.error)
        }
        window.addEventListener('error', errorHandler)
        return () => window.removeEventListener('error', errorHandler)
    }, [handleError])

    const value: ErrorBoundaryContextType = {
        hasError,
        error,
        handleError,
        resetError
    }

    return (
        <ErrorBoundaryContext.Provider value={value}>
            {children}
        </ErrorBoundaryContext.Provider>
    )
}

export default function useError() {
    const context = useContext(ErrorBoundaryContext)
    if (!context) {
        throw new Error('useError must be used within an ErrorBoundary')
    }
    return context
}

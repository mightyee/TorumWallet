import React, {
    createContext,
    useState,
    useEffect,
    useRef,
    useCallback,
    useContext,
} from 'react';

const initialToast = {
    message: '',
    type: null,
    visible: false,
    show: null
};

export interface IuseToast {
    hide: () => void;
    show: ({ ...args }: any) => void;
    toast: any;
}


const ToastContext = createContext({});
export const useToast = () => useContext(ToastContext) as IuseToast;
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState(initialToast);
    const timeout = useRef();

    useEffect(() => {
        if (toast.visible) {
            timeout.current = setTimeout(hide, 1500);
            return () => {
                if (timeout.current) {
                    clearTimeout(timeout.current);
                }
            };
        }
    }, [hide, toast]);

    const show = useCallback((args: any) => {
        setToast({ ...initialToast, visible: true, ...args });
    }, []);

    const hide = useCallback(() => {
        setToast({ ...toast, visible: false });
    }, [toast]);

    return (
        <ToastContext.Provider
            value={{
                hide,
                show,
                toast,
            }}>
            {children}
        </ToastContext.Provider>
    );
};
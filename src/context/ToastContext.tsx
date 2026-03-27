import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";
import { Toast, type ToastType } from "../components/ui/atoms/Toast";

interface ToastMessage {
	id: string;
	text: string;
	type: ToastType;
}

interface ToastContextType {
	showToast: (text: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<ToastMessage[]>([]);

	const showToast = useCallback((text: string, type: ToastType = "success") => {
		const id = Math.random().toString(36).substr(2, 9);
		setToasts((prev) => [...prev, { id, text, type }]);
	}, []);

	const removeToast = useCallback((id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<div className="toast-container">
				{toasts.map((t) => (
					<Toast
						key={t.id}
						message={t.text}
						type={t.type}
						onClose={() => removeToast(t.id)}
					/>
				))}
			</div>
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);
	if (!context) throw new Error("useToast must be used within ToastProvider");
	return context;
}

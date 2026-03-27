import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { fetchAgenda, fetchMembers } from "@/utils/adminData";

interface DataContextType {
	data?: SiteData;
	loading: boolean;
	error: Error | null;
	refetch: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
	const [data, setData] = useState<SiteData>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const [members, agenda] = await Promise.all([
				fetchMembers(),
				fetchAgenda(),
			]);

			setData({
				members: members,
				agenda: agenda,
			});
			setError(null);
		} catch (err) {
			console.error("DataContext fetch error:", err);
			setError(err instanceof Error ? err : new Error("Unknown error"));
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<DataContext.Provider value={{ data, loading, error, refetch: fetchData }}>
			{children}
		</DataContext.Provider>
	);
}

export function useData() {
	const context = useContext(DataContext);
	if (context === undefined) {
		throw new Error("useData must be used within a DataProvider");
	}
	return context;
}

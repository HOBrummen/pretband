import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/atoms/Button";
import { Input } from "@/components/ui/atoms/Input";
import { AdminTopBar } from "@/components/ui/molecules/AdminTopBar";
import { Search, Download, Globe, ChevronDown } from "lucide-react";

interface TranslationsEditorProps {
	nl: Record<string, any>;
	en: Record<string, any>;
	onSave: (nl: any, en: any) => void;
	isSyncing: boolean;
	onBack: () => void;
}

const flatten = (obj: Record<string, any>, prefix = ""): Record<string, string> => {
	return Object.keys(obj).reduce((acc: Record<string, string>, k) => {
		const pre = prefix.length ? `${prefix}.` : "";
		if (
			typeof obj[k] === "object" &&
			obj[k] !== null &&
			!Array.isArray(obj[k])
		) {
			const nested = flatten(obj[k], pre + k);
			Object.assign(acc, nested);
		} else {
			acc[pre + k] = obj[k];
		}
		return acc;
	}, {});
};

const unflatten = (obj: Record<string, string>): Record<string, any> => {
	const result: Record<string, any> = {};
	for (const i in obj) {
		const keys = i.split(".");
		keys.reduce((r: any, a, j) => {
			if (!r[a]) {
				r[a] = keys.length - 1 === j ? obj[i] : {};
			}
			return r[a];
		}, result);
	}
	return result;
};

export function TranslationsEditor({
	nl,
	en,
	onSave,
	isSyncing,
	onBack,
}: TranslationsEditorProps) {
	const { t } = useTranslation();
	const [flatNL, setFlatNL] = useState(() => flatten(nl));
	const [flatEN, setFlatEN] = useState(() => flatten(en));
	const [search, setSearch] = useState("");
	const [flash, setFlash] = useState(false);

	const keys = Object.keys(flatNL).filter(
		(k) =>
			k.toLowerCase().includes(search.toLowerCase()) ||
			flatNL[k].toLowerCase().includes(search.toLowerCase()) ||
			(flatEN[k]?.toLowerCase().includes(search.toLowerCase()) ?? false),
	);

	const handleUpdate = (lang: "nl" | "en", key: string, val: string) => {
		if (lang === "nl") {
			setFlatNL((prev) => ({ ...prev, [key]: val }));
		} else {
			setFlatEN((prev) => ({ ...prev, [key]: val }));
		}
	};

	const handleSave = () => {
		onSave(unflatten(flatNL), unflatten(flatEN));
		setFlash(true);
		setTimeout(() => setFlash(false), 2000);
	};

	const handleExport = () => {
		const data = { nl: unflatten(flatNL), en: unflatten(flatEN) };
		const blob = new Blob([JSON.stringify(data, null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "translations.json";
		a.click();
	};

	const sections = Array.from(new Set(keys.map((k) => k.split(".")[0])));
	const [collapsed, setCollapsed] = useState<Record<string, boolean>>(() =>
		sections.reduce((acc: Record<string, boolean>, s) => {
			acc[s] = true;
			return acc;
		}, {}),
	);

	const toggleSection = (s: string) => {
		setCollapsed((prev) => ({ ...prev, [s]: !prev[s] }));
	};

	return (
		<div className="py-20 px-6 max-w-[1600px] mx-auto min-h-screen font-body">
			<AdminTopBar
				title={t("admin.translations.title", "Vertalingen")}
				stat={t("admin.translations.stat", {
					count: Object.keys(flatNL).length,
				})}
				onBack={onBack}
				onSave={handleSave}
				isSyncing={isSyncing}
				flash={flash}
			>
				<Button
					variant="secondary"
					size="sm"
					onClick={() => {
						const nextCollapseState = !Object.values(collapsed)[0];
						setCollapsed(
							sections.reduce((acc: Record<string, boolean>, s) => {
								acc[s] = nextCollapseState;
								return acc;
							}, {}),
						);
					}}
				>
					{Object.values(collapsed).some((v) => v) ? t("admin.translations.expand_all") : t("admin.translations.collapse_all")}
				</Button>
				<Button variant="secondary" size="sm" onClick={handleExport}>
					<Download className="w-4 h-4 mr-2" />
					{t("admin.landing.export_json")}
				</Button>
			</AdminTopBar>

			<div className="mb-8 sticky top-24 z-10 transition-all duration-300">
				<div className="relative group">
					<Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5 group-focus-within:text-pret-yellow transition-colors" />
					<Input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder={t("admin.translations.search_placeholder", "Zoek op sleutel of tekst...")}
						className="pl-16 bg-black/60 backdrop-blur-3xl border-white/10 focus:border-pret-yellow/50 rounded-2xl h-14"
					/>
				</div>
			</div>

			<div className="flex flex-col gap-6">
				{Object.entries(
					keys.reduce((acc: Record<string, string[]>, k) => {
						const section = k.split(".")[0];
						if (!acc[section]) acc[section] = [];
						acc[section].push(k);
						return acc;
					}, {}),
				).map(([section, sectionKeys]) => {
					const isCollapsed = collapsed[section] && !search;
					return (
						<div
							key={section}
							className="flex flex-col border border-white/5 rounded-2xl overflow-hidden bg-white/[0.03] transition-all hover:bg-white/[0.05]"
						>
							<button
								type="button"
								onClick={() => toggleSection(section)}
								className="grid grid-cols-[1fr,1.5fr,1.5fr] gap-4 px-6 py-4 bg-white/[0.03] border-b border-white/5 items-center cursor-pointer hover:bg-white/[0.08] transition-colors text-left"
							>
								<div className="flex items-center gap-2">
									<Globe className={`transition-colors ${isCollapsed ? "text-white/20" : "text-pret-yellow"}`} />
									<span className="text-white font-display tracking-[2.5px] uppercase">
										{section}
									</span>
									<span className="text-white/20 lowercase font-body">
										({sectionKeys.length})
									</span>
									<ChevronDown className={`ml-auto text-white/20 transition-transform duration-300 ${!isCollapsed ? "rotate-180 text-pret-yellow/40" : ""}`} />
								</div>
							</button>

							{!isCollapsed && (
								<div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 divide-x divide-y divide-white/5">
									{sectionKeys.map((k) => (
										<div
											key={k}
											className="grid grid-cols-[1fr,1.4fr,1.4fr] gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors items-start border-white/5"
										>
											<div className="pt-2">
												<span className="text-white/40 font-display tracking-tight uppercase break-all leading-tight block truncate" title={k}>
													{k.split(".").slice(1).join(".") || k}
												</span>
											</div>
											<div className="relative">
												<span className="text-white/40 font-display text-xs tracking-tight uppercase break-all leading-tight block truncate">nl</span>
												<textarea
													id={`nl-${k}`}
													value={flatNL[k]}
													onChange={(e) => handleUpdate("nl", k, e.target.value)}
													className="w-full bg-black/40 border border-white/5 rounded-lg px-3 py-2 text-[13px] text-white font-body focus:outline-none focus:ring-1 focus:ring-pret-yellow/20 transition resize-none min-h-[38px] leading-snug placeholder:text-white/10"
												/>
											</div>
											<div className="relative">
												<span className="text-white/40 font-display text-xs tracking-tight uppercase break-all leading-tight block truncate">en</span>
												<textarea
													id={`en-${k}`}
													value={flatEN[k] || ""}
													onChange={(e) => handleUpdate("en", k, e.target.value)}
													className="w-full bg-black/40 border border-white/5 rounded-lg px-3 py-2 text-[13px] text-white font-body focus:outline-none focus:ring-1 focus:ring-pret-yellow/20 transition resize-none min-h-[38px] leading-snug placeholder:text-white/10"
												/>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					);
				})}

				{keys.length === 0 && (
					<div className="text-center text-white/40 py-20 font-display tracking-widest uppercase bg-black/20 rounded-3xl border border-dashed border-white/10">
						{t("admin.translations.no_results", "Geen vertalingen gevonden")}
					</div>
				)}
			</div>
		</div>
	);
}

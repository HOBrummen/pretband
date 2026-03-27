import { Plus, Trash, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/atoms/Badge";
import { Button } from "@/components/ui/atoms/Button";
import { Heading } from "@/components/ui/atoms/Heading";
import { Input } from "@/components/ui/atoms/Input";
import { AdminTopBar } from "@/components/ui/molecules/AdminTopBar";

interface MembersEditorProps {
	data: SiteData;
	onChange: (data: SiteData) => void;
	onSave: () => void;
	isSyncing: boolean;
	onBack: () => void;
}

export function MembersEditor({
	data,
	onChange,
	onSave,
	isSyncing,
	onBack,
}: MembersEditorProps) {
	const { t } = useTranslation();
	const [sections, setSections] = useState(data.members.sections);
	const [newNames, setNewNames] = useState<Record<number, string>>({});
	const [flash, setFlash] = useState(false);

	const commit = (next: MembersSection[]) => {
		setSections(next);
		onChange({ ...data, members: { ...data.members, sections: next } });
		setFlash(true);
		setTimeout(() => setFlash(false), 1600);
	};

	const updateKey = (i: number, v: string) =>
		commit(
			sections.map((s: MembersSection, j: number) =>
				j === i ? { ...s, key: v } : s,
			),
		);
	const removeName = (si: number, ni: number) =>
		commit(
			sections.map((s: MembersSection, j: number) =>
				j === si
					? { ...s, names: s.names.filter((_: string, k: number) => k !== ni) }
					: s,
			),
		);
	const deleteSection = (i: number) =>
		commit(sections.filter((_: MembersSection, j: number) => j !== i));
	const addSection = () =>
		commit([...sections, { key: `sectie_${Date.now()}`, names: [] }]);

	const addName = (si: number) => {
		const n = (newNames[si] || "").trim();
		if (!n) return;
		commit(
			sections.map((s: MembersSection, j: number) =>
				j === si ? { ...s, names: [...s.names, n] } : s,
			),
		);
		setNewNames((p) => ({ ...p, [si]: "" }));
	};

	const total = sections.reduce(
		(a: number, s: MembersSection) => a + s.names.length,
		0,
	);

	return (
		<div className="py-20 px-6 max-w-6xl mx-auto min-h-screen">
			<AdminTopBar
				title={t("admin.members.title")}
				stat={t("admin.members.stat", {
					members: total,
					sections: sections.length,
				})}
				onBack={onBack}
				onSave={onSave}
				isSyncing={isSyncing}
				flash={flash}
				addItem={addSection}
				addItemLabel={t("admin.members.new_section")}
			/>

			<div className="flex flex-col gap-8">
				{sections.map((sec: MembersSection, si: number) => {
					return (
						<div
							key={sec.key}
							className="bg-black/40 border border-white/10 rounded-[2rem] p-8 md:p-10 animate-fade-in"
						>
							<div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
								<div className="flex-1">
									<Input
										id={`section-key-${si}`}
										label={t("admin.members.section_key")}
										value={sec.key}
										onChange={(e) => updateKey(si, e.target.value)}
										placeholder="section_key"
									/>
								</div>
								<div className="md:text-right">
									<Heading level={3} variant="yellow" className="text-3xl">
										{sec.key.replace(/_/g, " ")}
									</Heading>
									<div className="text-white/60 text-xs tracking-widest uppercase mt-2">
										{t("admin.members.section_stat", {
											count: sec.names.length,
										})}
									</div>
								</div>
							</div>

							<div className="flex flex-wrap gap-3 mb-8 min-h-[40px] items-center">
								{sec.names.length === 0 && (
									<span className="text-white/40 italic text-sm">
										{t("admin.members.no_members")}
									</span>
								)}
								{sec.names
									.sort((a: string, b: string) => a.localeCompare(b))
									.map((name: string, ni: number) => (
										<Badge
											key={name}
											variant="dark"
											size="sm"
											className="group border border-white/15 px-3 pr-2 flex items-center gap-2"
										>
											<span className="font-body">{name}</span>
											<button
												type="button"
												onClick={() => removeName(si, ni)}
												className="text-pret-red/30 hover:text-pret-red text-lg transition-colors leading-none"
												aria-label={t("admin.members.remove_aria", { name })}
											>
												<X />
											</button>
										</Badge>
									))}
							</div>

							<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
								<div className="flex flex-1 w-full">
									<Input
										id={`add-name-${si}`}
										value={newNames[si] || ""}
										onChange={(e) =>
											setNewNames((p) => ({ ...p, [si]: e.target.value }))
										}
										onKeyDown={(e) => e.key === "Enter" && addName(si)}
										placeholder={t("admin.members.add_name_placeholder")}
										className="rounded-r-none border-r-0"
									/>
									<Button
										variant="outline"
										onClick={() => addName(si)}
										className="rounded-l-none px-4 h-auto flex items-center justify-center"
									>
										<Plus />
									</Button>
								</div>
								<Button
									variant="ghost"
									onClick={() => deleteSection(si)}
									size="md"
									className="inline-flex items-center gap-2"
								>
									<Trash />
									{t("admin.members.delete_section")}
								</Button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

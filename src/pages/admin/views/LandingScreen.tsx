import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/atoms/Button";
import { Heading } from "@/components/ui/atoms/Heading";
import en from "@/locales/en.json";

interface LandingScreenProps {
	data: SiteData;
	onSelect: (view: string) => void;
	onLogout: () => void;
}

export function LandingScreen({
	data,
	onSelect,
	onLogout,
}: LandingScreenProps) {
	const { t } = useTranslation();
	const totalMembers = data.members.sections.reduce(
		(a: number, s: MembersSection) => a + s.names.length,
		0,
	);

	return (
		<div className="py-20 px-6 max-w-6xl mx-auto min-h-screen">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 animate-fade-in gap-6">
				<div>
					<Heading level={2} variant="yellow" className="text-5xl md:text-6xl">
						{t("admin.landing.title")}
					</Heading>
					<p className="text-white/60 text-xs tracking-[2.5px] uppercase mt-2">
						{t("admin.landing.subtitle")}
					</p>
				</div>
				<div className="flex flex-wrap gap-4">
					<Button variant="secondary" onClick={onLogout} size="sm">
						{t("admin.landing.logout")}
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{[
					{
						key: "agenda",
						icon: "📅",
						title: t("admin.landing.agenda_title"),
						stat: t("admin.landing.agenda_stat", {
							count: data.agenda.events.length,
						}),
						desc: t("admin.landing.agenda_desc"),
					},
					{
						key: "members",
						icon: "🎺",
						title: t("admin.landing.members_title"),
						stat: t("admin.landing.members_stat", {
							members: totalMembers,
							sections: data.members.sections.length,
						}),
						desc: t("admin.landing.members_desc"),
					},
					{
						key: "translations",
						icon: "🌐",
						title: t("admin.landing.translations_title", "VERTALINGEN"),
						stat: t("admin.translations.stat", {
							count: Object.values(en).reduce((a, v) => a + (typeof v === "object" ? Object.keys(v).length : 1), 0)
						}),
						desc: t("admin.landing.translations_desc", "Beheer de teksten van de website in alle talen."),
					},
				].map((c) => (
					<button
						type="button"
						key={c.key}
						onClick={() => onSelect(c.key)}
						onKeyDown={(e) => e.key === "Enter" && onSelect(c.key)}
						tabIndex={0}
						className="group block relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-10 transition-all duration-300 hover:bg-white/10 hover:border-pret-yellow hover:-translate-y-2 cursor-pointer animate-fade-in"
					>
						<div className="text-5xl mb-6">{c.icon}</div>
						<Heading
							level={3}
							className="text-4xl mb-3 group-hover:text-pret-yellow transition-colors"
						>
							{c.title}
						</Heading>
						<div className="text-pret-red text-sm font-bold tracking-[1.5px] uppercase mb-4">
							{c.stat}
						</div>
						<p className="text-white/60 text-lg leading-relaxed">{c.desc}</p>
						<div className="mt-8 text-pret-yellow text-sm font-bold font-display uppercase tracking-widest group-hover:translate-x-2 transition-transform">
							{t("admin.landing.edit_button")}
						</div>
					</button>
				))}
			</div>
		</div>
	);
}

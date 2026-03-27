import data from "./siteData.json";

export type SupportedLanguage = "en" | "nl";

export interface MembersSection {
	key: string;
	names: string[];
}

export interface LocalizedString {
	en: string;
	nl: string;
}

export interface AgendaEvent {
	id: string;
	date: string;
	title: string;
	location: string;
}

export interface SiteData {
	members: { sections: MembersSection[] };
	agenda: { events: AgendaEvent[] };
}

export const siteData = data as SiteData;

export const normalizeLang = (language: string): SupportedLanguage => {
	return language.toLowerCase().startsWith("nl") ? "nl" : "en";
};

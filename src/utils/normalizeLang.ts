type SupportedLanguage = "nl" | "en";

export const normalizeLang = (language: string): SupportedLanguage => {
	return language.toLowerCase().startsWith("nl") ? "nl" : "en";
};

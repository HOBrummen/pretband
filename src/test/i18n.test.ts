import { describe, expect, it } from "vitest";
import i18n from "@/i18n";

describe("i18n", () => {
	it("initializes with 'nl' and 'en' resources", () => {
		expect(i18n.hasResourceBundle("nl", "translation")).toBe(true);
		expect(i18n.hasResourceBundle("en", "translation")).toBe(true);
	});

	it("has 'nl' as the fallback language", () => {
		// i18next normalises fallbackLng to an array internally
		expect(i18n.options.fallbackLng).toContain("nl");
	});

	it("can translate a known key in 'nl'", async () => {
		await i18n.changeLanguage("nl");
		const value = i18n.t("agenda.title_1");
		expect(typeof value).toBe("string");
		expect(value.length).toBeGreaterThan(0);
	});

	it("can translate a known key in 'en'", async () => {
		await i18n.changeLanguage("en");
		const value = i18n.t("agenda.title_1");
		expect(typeof value).toBe("string");
		expect(value.length).toBeGreaterThan(0);
	});
});

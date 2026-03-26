import { describe, expect, it } from "vitest";
import { normalizeLang, siteData } from "@/data/siteData";

describe("siteData", () => {
	it("has a members section with sections array", () => {
		expect(siteData.members).toBeDefined();
		expect(Array.isArray(siteData.members.sections)).toBe(true);
	});

	it("has an agenda with events array", () => {
		expect(siteData.agenda).toBeDefined();
		expect(Array.isArray(siteData.agenda.events)).toBe(true);
	});
});

describe("normalizeLang", () => {
	it("returns 'nl' for Dutch locale codes", () => {
		expect(normalizeLang("nl")).toBe("nl");
		expect(normalizeLang("nl-NL")).toBe("nl");
		expect(normalizeLang("NL")).toBe("nl");
	});

	it("returns 'en' for non-Dutch locale codes", () => {
		expect(normalizeLang("en")).toBe("en");
		expect(normalizeLang("en-US")).toBe("en");
		expect(normalizeLang("fr")).toBe("en");
		expect(normalizeLang("de")).toBe("en");
	});
});

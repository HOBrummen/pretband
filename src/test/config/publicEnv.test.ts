import { describe, expect, it } from "vitest";

// These helpers are not exported, so we test them indirectly via the publicEnv object
// and through import.meta.env which is set by vite/vitest.
import { publicEnv } from "@/config/publicEnv";

describe("publicEnv", () => {
	it("exports expected keys", () => {
		expect(publicEnv).toHaveProperty("basinFormId");
		expect(publicEnv).toHaveProperty("recaptchaSiteKey");
		expect(publicEnv).toHaveProperty("instagramUrl");
		expect(publicEnv).toHaveProperty("tiktokUrl");
		expect(publicEnv).toHaveProperty("gtmTagId");
		expect(publicEnv).toHaveProperty("showGallery");
		expect(publicEnv).toHaveProperty("showAbout");
		expect(publicEnv).toHaveProperty("showAgenda");
		expect(publicEnv).toHaveProperty("showMembers");
		expect(publicEnv).toHaveProperty("showHighlights");
		expect(publicEnv).toHaveProperty("showContact");
	});

	it("boolean feature flags are always booleans", () => {
		expect(typeof publicEnv.showGallery).toBe("boolean");
		expect(typeof publicEnv.showAbout).toBe("boolean");
		expect(typeof publicEnv.showAgenda).toBe("boolean");
		expect(typeof publicEnv.showMembers).toBe("boolean");
		expect(typeof publicEnv.showHighlights).toBe("boolean");
		expect(typeof publicEnv.showContact).toBe("boolean");
	});

	it("string env vars are either a non-empty string or undefined", () => {
		for (const key of ["basinFormId", "recaptchaSiteKey", "instagramUrl", "tiktokUrl", "gtmTagId"] as const) {
			const val = publicEnv[key];
			expect(val === undefined || (typeof val === "string" && val.length > 0)).toBe(true);
		}
	});
});

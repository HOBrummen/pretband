import { describe, expect, it, vi } from "vitest";

vi.mock("@/config/publicEnv", () => ({
	publicEnv: {
		showGallery: true,
		showAbout: true,
		showAgenda: false,
		showMembers: true,
		showHighlights: true,
		showContact: false,
	},
}));

const { FEATURE_FLAGS, isFeatureEnabled } = await import("@/config/featureFlags");

describe("featureFlags", () => {
	it("maps publicEnv values to FEATURE_FLAGS", () => {
		expect(FEATURE_FLAGS.GALLERY).toBe(true);
		expect(FEATURE_FLAGS.ABOUT).toBe(true);
		expect(FEATURE_FLAGS.AGENDA).toBe(false);
		expect(FEATURE_FLAGS.CONTACT).toBe(false);
	});

	it("isFeatureEnabled returns the correct boolean", () => {
		expect(isFeatureEnabled("GALLERY")).toBe(true);
		expect(isFeatureEnabled("AGENDA")).toBe(false);
	});
});

import { describe, expect, it } from "vitest";
import { galleryImages } from "@/data/galleryData";

describe("galleryData", () => {
	it("exports a non-empty array of image URLs", () => {
		expect(Array.isArray(galleryImages)).toBe(true);
		expect(galleryImages.length).toBeGreaterThan(0);
	});

	it("all entries are valid URL strings", () => {
		for (const url of galleryImages) {
			expect(typeof url).toBe("string");
			expect(url.startsWith("http")).toBe(true);
		}
	});
});

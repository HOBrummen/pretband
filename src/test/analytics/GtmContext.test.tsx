import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GtmProvider, useGtmContext } from "@/analytics/GtmContext";

function wrapper({ children }: { children: React.ReactNode }) {
	return <GtmProvider>{children}</GtmProvider>;
}

describe("GtmContext", () => {
	it("throws if used outside provider", () => {
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		expect(() => renderHook(() => useGtmContext())).toThrow(
			"useGtmContext must be used within a GtmProvider",
		);
		consoleSpy.mockRestore();
	});

	it("initializes with idle status and null tagId", () => {
		const { result } = renderHook(() => useGtmContext(), { wrapper });
		expect(result.current.state.status).toBe("idle");
		expect(result.current.state.tagId).toBeNull();
	});
});

import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AnalyticsProvider, useAnalyticsContext } from "@/analytics/AnalyticsContext";

function wrapper({ children }: { children: React.ReactNode }) {
	return <AnalyticsProvider>{children}</AnalyticsProvider>;
}

describe("AnalyticsContext", () => {
	it("throws if used outside provider", () => {
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		expect(() => renderHook(() => useAnalyticsContext())).toThrow(
			"useAnalyticsContext must be used within an AnalyticsProvider"
		);
		consoleSpy.mockRestore();
	});

	it("initializes with idle status", () => {
		const { result } = renderHook(() => useAnalyticsContext(), { wrapper });
		expect(result.current.state.status).toBe("idle");
		expect(result.current.state.formId).toBeNull();
	});
});

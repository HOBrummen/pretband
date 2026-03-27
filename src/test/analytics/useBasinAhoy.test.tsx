import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AnalyticsProvider } from "@/analytics/AnalyticsContext";
import { useBasinAhoy } from "@/analytics/useBasinAhoy";

// Mock ahoy.js dynamic import
vi.mock("ahoy.js", () => ({}));

function wrapper({ children }: { children: React.ReactNode }) {
	return <AnalyticsProvider>{children}</AnalyticsProvider>;
}

describe("useBasinAhoy", () => {
	it("does not attempt to load when disabled", () => {
		const { result } = renderHook(() => useBasinAhoy("test-form", false), {
			wrapper,
		});
		// The hook returns nothing; we just verify it doesn't throw
		expect(result.current).toBeUndefined();
	});
});

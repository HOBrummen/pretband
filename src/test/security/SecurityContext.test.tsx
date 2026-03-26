import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SecurityProvider, useSecurityContext } from "@/security/SecurityContext";

function wrapper({ children }: { children: React.ReactNode }) {
	return <SecurityProvider>{children}</SecurityProvider>;
}

describe("SecurityContext", () => {
	it("throws if used outside provider", () => {
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		expect(() => renderHook(() => useSecurityContext())).toThrow(
			"useSecurityContext must be used within a SecurityProvider"
		);
		consoleSpy.mockRestore();
	});

	it("initializes with idle status and nulls", () => {
		const { result } = renderHook(() => useSecurityContext(), { wrapper });
		expect(result.current.state.status).toBe("idle");
		expect(result.current.state.siteKey).toBeNull();
		expect(result.current.state.promise).toBeNull();
	});
});

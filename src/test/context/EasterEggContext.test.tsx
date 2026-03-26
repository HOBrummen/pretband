// Use the REAL module, not the global mock in setup.ts
vi.unmock("@/context/EasterEggContext");

import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { EasterEggProvider, useEasterEggs } from "@/context/EasterEggContext";

// localStorage is available in jsdom, but the vi.unmock must come before imports.
// We clear storage before each test to avoid cross-test pollution.
beforeEach(() => {
	localStorage.clear();
});

function wrapper({ children }: { children: React.ReactNode }) {
	return <EasterEggProvider>{children}</EasterEggProvider>;
}

describe("EasterEggContext", () => {
	it("starts with no found eggs", () => {
		const { result } = renderHook(() => useEasterEggs(), { wrapper });
		expect(result.current.foundEggs).toEqual([]);
		expect(result.current.isAllFound).toBe(false);
	});

	it("findEgg adds a new egg to foundEggs", () => {
		const { result } = renderHook(() => useEasterEggs(), { wrapper });
		act(() => {
			result.current.findEgg("doot");
		});
		expect(result.current.foundEggs).toContain("doot");
	});

	it("findEgg does not add duplicate eggs", () => {
		const { result } = renderHook(() => useEasterEggs(), { wrapper });
		act(() => {
			result.current.findEgg("doot");
			result.current.findEgg("doot");
		});
		expect(result.current.foundEggs.filter((e) => e === "doot").length).toBe(1);
	});

	it("isAllFound is true when all 4 eggs are found", () => {
		const { result } = renderHook(() => useEasterEggs(), { wrapper });
		act(() => {
			result.current.findEgg("doot");
			result.current.findEgg("rainbow-star");
			result.current.findEgg("bouncing-pret");
			result.current.findEgg("confetti-rain");
		});
		expect(result.current.isAllFound).toBe(true);
	});

	it("resetEggs clears foundEggs", () => {
		const { result } = renderHook(() => useEasterEggs(), { wrapper });
		act(() => {
			result.current.findEgg("doot");
		});
		expect(result.current.foundEggs.length).toBe(1);
		act(() => {
			result.current.resetEggs();
		});
		expect(result.current.foundEggs).toEqual([]);
	});
});

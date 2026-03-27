import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BackgroundLayer } from "@/components/ui/BackgroundLayer";

describe("BackgroundLayer Component", () => {
	it("renders without crashing", () => {
		const { container } = render(<BackgroundLayer />);

		const bgDiv = container.firstChild as HTMLElement;
		expect(bgDiv).toBeInTheDocument();
		expect(bgDiv).toHaveClass("bg-pret-dark");
	});
});

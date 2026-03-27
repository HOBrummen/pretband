import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Highlights } from "@/components/sections/Highlights";

vi.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: (key: string) => key,
	}),
}));

describe("Highlights Component", () => {
	it("renders the highlights section and iframe", () => {
		render(<Highlights />);

		expect(screen.getByText("highlights.title")).toBeInTheDocument();
		expect(screen.getByText("highlights.description")).toBeInTheDocument();

		const iframe = screen.getByTitle("highlights.watch_video");
		expect(iframe).toBeInTheDocument();
		expect(iframe).toHaveAttribute(
			"src",
			"https://www.youtube.com/embed/98VH-CuOSvI",
		);
	});
});

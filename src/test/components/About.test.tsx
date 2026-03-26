import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { About } from "@/components/About";

vi.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: (key: string) => key,
	}),
}));

describe("About Component", () => {
	it("renders the about section", () => {
		render(<About />);
		
		expect(screen.getByAltText("The Band")).toBeInTheDocument();
		expect(screen.getByText("about.title_1")).toBeInTheDocument();
		expect(screen.getByText("about.title_2")).toBeInTheDocument();
		expect(screen.getByText("about.description")).toBeInTheDocument();
		expect(screen.getByText("about.feat_1_title")).toBeInTheDocument();
		expect(screen.getByText("about.feat_2_title")).toBeInTheDocument();
	});
});

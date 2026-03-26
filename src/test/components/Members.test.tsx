import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Members } from "@/components/Members";

vi.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: (key: string) => key,
	}),
}));

vi.mock("@/data/siteData", () => ({
	siteData: {
		members: {
			sections: [
				{
					key: "sax",
					names: ["Alice", "Bob"]
				}
			]
		}
	}
}));

describe("Members Component", () => {
	it("renders the members section and lists members", () => {
		render(<Members />);
		
		expect(screen.getByText("members.title")).toBeInTheDocument();
		expect(screen.getByText("members.categories.sax")).toBeInTheDocument();
		expect(screen.getByText("– Alice")).toBeInTheDocument();
		expect(screen.getByText("– Bob")).toBeInTheDocument();
	});
});

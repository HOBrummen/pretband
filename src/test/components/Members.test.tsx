import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Members } from "@/components/sections/Members";

vi.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: (key: string) => key,
	}),
}));

vi.mock("@/context/DataContext", () => ({
	useData: () => ({
		data: {
			members: {
				sections: [
					{
						key: "sax",
						names: ["Alice", "Bob"],
					},
				],
			},
		},
		loading: false,
		error: null,
		refetch: vi.fn(),
	}),
}));

vi.mock("@/data/siteData", () => ({
	MembersSection: {},
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

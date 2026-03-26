import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Navbar } from "@/components/Navbar";

vi.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: (key: string) => key,
		i18n: {
			language: "nl",
			changeLanguage: vi.fn(),
		}
	}),
}));

vi.mock("@/config/featureFlags", () => ({
	FEATURE_FLAGS: {
		ABOUT: true,
		MEMBERS: true,
		AGENDA: true,
		CONTACT: true,
	}
}));

describe("Navbar Component", () => {
	it("renders correctly with feature flags on", () => {
		render(<Navbar />);
		
		const bandLinks = screen.getAllByText("navbar.band");
		expect(bandLinks.length).toBeGreaterThan(0);
		
		const membersLinks = screen.getAllByText("navbar.members");
		expect(membersLinks.length).toBeGreaterThan(0);
	});

	it("toggles mobile menu when menu button is clicked", () => {
		render(<Navbar />);
		
		const openButton = screen.getByLabelText("navbar.open_menu");
		fireEvent.click(openButton);
		
		const closeButtons = screen.getAllByLabelText("navbar.close_menu");
		expect(closeButtons.length).toBeGreaterThan(0);
	});
});

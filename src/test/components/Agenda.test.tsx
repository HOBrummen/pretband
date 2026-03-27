import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Agenda } from "@/components/sections/Agenda";

vi.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: (key: string) => key,
		i18n: { language: "nl" },
	}),
}));

vi.mock("@/context/DataContext", () => ({
	useData: () => ({
		data: {
			agenda: {
				events: [
					{
						id: "test-event-1",
						date: "3000-12-31", // Future date to pass the filter
						title: "Test Performance",
						location: "Test City",
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
	normalizeLang: (lang: string) => lang,
}));

// Mock the child EventCard to avoid testing its internal logic here
vi.mock("@/components/ui/molecules/EventCard", () => ({
	EventCard: ({ title, location }: { title: string; location: string }) => (
		<div data-testid="event-card">
			<span>{title}</span>
			<span>{location}</span>
		</div>
	),
}));

describe("Agenda Component", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2024-01-01T00:00:00Z"));
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("renders the agenda section and future events", () => {
		render(<Agenda />);

		expect(screen.getByText("agenda.title_1")).toBeInTheDocument();
		expect(screen.getByText("agenda.title_2")).toBeInTheDocument();

		const eventCards = screen.getAllByTestId("event-card");
		expect(eventCards).toHaveLength(1);
		expect(screen.getByText("Test Performance")).toBeInTheDocument();
		expect(screen.getByText("Test City")).toBeInTheDocument();
	});
});

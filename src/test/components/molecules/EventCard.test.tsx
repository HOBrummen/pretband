import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EventCard } from "@/components/ui/molecules/EventCard";

describe("EventCard Component", () => {
	const defaultProps = {
		date: "2024-05-20",
		title: "Test Concert",
		location: "The Park",
		status: "Confirmed",
	};

	it("renders event details correctly", () => {
		render(<EventCard {...defaultProps} />);
		expect(screen.getByText(defaultProps.date)).toBeInTheDocument();
		expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
		expect(screen.getByText(defaultProps.location)).toBeInTheDocument();
		expect(screen.getByText(defaultProps.status)).toBeInTheDocument();
	});

	it("applies variant classes", () => {
		const { container } = render(<EventCard {...defaultProps} variant="red" />);
		expect(container.firstChild).toHaveClass("hover:bg-pret-red");
	});
});

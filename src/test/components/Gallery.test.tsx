import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Gallery } from "@/components/Gallery";

vi.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: (key: string) => key,
	}),
}));

vi.mock("@/data/galleryData", () => ({
	galleryImages: [
		"image1.jpg",
		"image2.jpg"
	]
}));

describe("Gallery Component", () => {
	it("renders the gallery section and images", () => {
		render(<Gallery />);
		
		expect(screen.getByText("gallery.title")).toBeInTheDocument();
		expect(screen.getByText("gallery.description")).toBeInTheDocument();
		
		const images = screen.getAllByRole("img");
		expect(images).toHaveLength(2);
	});

	it("opens the lightbox when an image is clicked", () => {
		render(<Gallery />);
		
		const buttons = screen.getAllByRole("button");
		fireEvent.click(buttons[0]);
		
		expect(screen.getByAltText("Gallery full view")).toBeInTheDocument();
		expect(screen.getByText("1 / 2")).toBeInTheDocument();
	});
});

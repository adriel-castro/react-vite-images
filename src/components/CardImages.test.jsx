import React from "react";
import { render, screen } from "@testing-library/react";
import CardImages from "./CardImages";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("CardImages Component", () => {
  it("should renders the image with the correct src and alt attributes", () => {
    const mockImage = {
      url: "https://instapage.com/blog/ultimate-guide-to-color-psychology",
      title: "Test Image",
    };

    render(<CardImages image={mockImage} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockImage.url);
    expect(img).toHaveAttribute("alt", mockImage.title);
  });

  it("should renders the image title correctly", () => {
    const mockImage = {
      url: "https://instapage.com/blog/ultimate-guide-to-color-psychology",
      title: "Test Image",
    };

    render(<CardImages image={mockImage} />);

    expect(screen.getByText(mockImage.title)).toBeInTheDocument();
  });
});

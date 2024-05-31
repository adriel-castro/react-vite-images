import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Images from "./Images";
import { getImages } from "../api";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// Mocking sub-components
vi.mock("../reusables/Loader", () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock("../reusables/Paginator/Pagination", () => ({
  default: ({ currentPage, onPageChange, totalCount, pageSize }) => (
    <div>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
      <p>Page {currentPage}</p>
    </div>
  ),
}));

vi.mock("./Search", () => ({
  default: ({ keywords, setKeywords }) => (
    <input
      type="text"
      value={keywords}
      onChange={(e) => setKeywords(e.target.value)}
      placeholder="Search Keywords"
    />
  ),
}));

vi.mock("./CardImages", () => ({
  default: ({ image }) => <div>{image.title}</div>,
}));

// Mocking getImages API call
vi.mock("../api", () => ({
  getImages: vi.fn(),
}));

describe("Images Component", () => {
  it("should renders loader initially", () => {
    getImages.mockResolvedValueOnce({ json: () => Promise.resolve([]) });
    render(<Images />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should renders images after fetching data", async () => {
    const mockData = [
      { id: 1, title: "Image 1" },
      { id: 2, title: "Image 2" },
    ];
    getImages.mockResolvedValueOnce({ json: () => Promise.resolve(mockData) });

    render(<Images />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Image 1")).toBeInTheDocument();
    expect(screen.getByText("Image 2")).toBeInTheDocument();
  });

  it("should filters images based on keywords", async () => {
    const mockData = [
      { id: 1, title: "Image 1" },
      { id: 2, title: "Another Image" },
    ];
    getImages.mockResolvedValue({ json: () => Promise.resolve(mockData) });

    render(<Images />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Search Keywords");
    fireEvent.change(input, { target: { value: "Another" } });

    await waitFor(() => {
      expect(screen.queryByText("Image 1")).not.toBeInTheDocument();
      expect(screen.getByText("Another Image")).toBeInTheDocument();
    });
  });

  it("should handles pagination correctly", async () => {
    const mockData = Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      title: `Image ${index + 1}`,
    }));
    getImages.mockResolvedValue({ json: () => Promise.resolve(mockData) });

    render(<Images />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Image 1")).toBeInTheDocument();
    expect(screen.getByText("Image 30")).toBeInTheDocument();
    expect(screen.queryByText("Image 31")).not.toBeInTheDocument();

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("Image 31")).toBeInTheDocument();
      expect(screen.queryByText("Image 1")).not.toBeInTheDocument();
    });
  });
});

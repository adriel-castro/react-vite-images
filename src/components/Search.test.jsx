import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Search from "./Search";
import "@testing-library/jest-dom/vitest";

describe("Search Component", () => {
  it("should renders with the initial keywords", () => {
    render(<Search keywords="initial value" setKeywords={() => {}} />);
    expect(screen.getByDisplayValue("initial value")).toBeInTheDocument();
  });

  it("should call setKeywords on input change", () => {
    const setKeywordsMock = vi.fn();
    render(<Search keywords="" setKeywords={setKeywordsMock} />);
    const input = screen.getByPlaceholderText("Search Keywords");
    fireEvent.change(input, { target: { value: "new value" } });
    expect(setKeywordsMock).toHaveBeenCalledWith("new value");
  });

  it("should focuses the input when keywords are empty", () => {
    render(<Search keywords="" setKeywords={() => {}} />);
    const input = screen.getByPlaceholderText("Search Keywords");
    expect(input).toHaveFocus();
  });

  it("should clears the search input when the clear button is clicked", () => {
    const setKeywordsMock = vi.fn();
    render(<Search keywords="test value" setKeywords={setKeywordsMock} />);
    const button = screen.getByText("Clear");
    fireEvent.click(button);
    expect(setKeywordsMock).toHaveBeenCalledWith("");
  });

  it("should disables the clear button when keywords are empty", () => {
    render(<Search keywords="" setKeywords={() => {}} />);
    const button = screen.getByText("Clear");
    expect(button).toBeDisabled();
  });

  it("should enables the clear button when keywords are not empty", () => {
    render(<Search keywords="test value" setKeywords={() => {}} />);
    const button = screen.getByText("Clear");
    expect(button).not.toBeDisabled();
  });
});

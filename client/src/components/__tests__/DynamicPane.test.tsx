import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DynamicPane from "../DynamicPane";

describe("DynamicPane", () => {
  it("renders compact dock", () => {
    render(<DynamicPane mode="compact" onModeChange={() => {}} />);
    expect(screen.getByLabelText("Open intelligence desk")).toBeTruthy();
  });

  it("calls onModeChange when dock is clicked", () => {
    const onModeChange = vi.fn();
    render(<DynamicPane mode="compact" onModeChange={onModeChange} />);
    fireEvent.click(screen.getByLabelText("Open intelligence desk"));
    expect(onModeChange).toHaveBeenCalledWith("float");
  });
});

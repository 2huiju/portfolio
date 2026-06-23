import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { IOSHome } from "@/components/ios/IOSHome";

describe("IOSHome", () => {
  it("앱 그리드에 섹션 앱이 보인다", () => {
    render(<IOSHome />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("앱을 탭하면 시트(dialog)가 열린다", () => {
    render(<IOSHome />);
    fireEvent.click(screen.getByText("About"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

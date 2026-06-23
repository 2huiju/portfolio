import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MenuBar } from "@/components/desktop/MenuBar";

describe("MenuBar", () => {
  it("앱 이름을 보여준다", () => {
    render(<MenuBar appName="VS Code" />);
    expect(screen.getByText("VS Code")).toBeInTheDocument();
  });

  it("menubar 역할을 가진다", () => {
    render(<MenuBar />);
    expect(screen.getByRole("menubar")).toBeInTheDocument();
  });
});

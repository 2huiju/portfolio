import { describe, it, expect } from "vitest";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { experience, education } from "@/content/experience";
import { FILES } from "@/content/files";

describe("content", () => {
  it("프로필 핵심 필드", () => {
    expect(profile.name).toBe("이희주");
    expect(profile.years).toBe(4);
    expect(profile.email).toContain("@");
    expect(profile.github).toContain("github.com/2huiju");
  });

  it("프로젝트 5개 + 필수 필드", () => {
    expect(projects.length).toBe(5);
    for (const p of projects) {
      expect(p.name).toBeTruthy();
      expect(Array.isArray(p.stack)).toBe(true);
      expect(["운영", "종료"]).toContain(p.status);
    }
  });

  it("경력 3개 + 교육 3개", () => {
    expect(experience.length).toBe(3);
    expect(education.length).toBe(3);
  });

  it("파일 6개 + vscode-icons 아이콘", () => {
    expect(FILES.length).toBe(6);
    for (const f of FILES) {
      expect(f.icon).toMatch(/^vscode-icons:/);
    }
  });
});

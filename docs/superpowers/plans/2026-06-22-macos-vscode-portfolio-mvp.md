# macOS + VS Code 포트폴리오 (MVP) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 브라우저에 macOS 데스크톱과 그 위에 열린 VS Code 창으로 이희주의 포트폴리오를 보여주는 Next.js 사이트의 MVP를 만들어 Vercel에 배포한다.

**Architecture:** Next.js(App Router)·TypeScript·Tailwind 기반 SSG. 데스크톱 셸(Desktop/MenuBar/Dock/Window)이 껍데기, VS Code 앱이 콘텐츠 렌더러. 포트폴리오 콘텐츠는 `src/content/*` 데이터로 분리. 데스크톱 폭에서는 macOS 셸, 모바일 폭에서는 iOS 홈화면을 클라이언트에서 분기 렌더.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion(드래그·매그니피케이션), zustand(창 상태), @iconify/react(vscode-icons·logos 아이콘), Vitest + Testing Library(로직 테스트), Playwright(비주얼 검수). 배포 Vercel.

## Global Constraints

- 디자인 1순위 원칙: **macOS/VS Code를 사실적으로 재현**. 이모지 아이콘 금지 — 파일아이콘=vscode-icons(@iconify) SVG, 독앱=실제 로고(@iconify logos) 또는 충실 SVG 재현, 시스템 아이콘(배터리·와이파이)=@iconify 충실 매칭.
- 언어: 한국어. 주석은 한글(기존 사용자 규칙).
- 렌더링: SSG only(서버 데이터 없음). `prefers-reduced-motion` 존중.
- 콘텐츠 출처: 메모리 `project-resume-portfolio-2026-06` + 백업 `~/Downloads/이력서_포트폴리오_원본/`. 정량 성과 없음 → 정성 문구.
- 콘텐츠 사실: 이희주 / FE 4년차 / heejoo45890@gmail.com / github.com/2huiju / 경력 3(크레버스 AI Dev 2024.04~ · 크립티드 2023.04–2024.03 · 바오밥파트너즈 2022.09–2023.04) / 프로젝트 5(HUMMINGo, HUMMINGo-About, KStadium, KStadium Admin, 3 Seconds Club).
- 커밋 메시지: plain 서술형(브래킷 태그 금지), 끝에 `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.

---

### Task 1: Next.js 프로젝트 스캐폴드 + Tailwind + 기본 도구

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `vitest.config.ts`, `src/test/setup.ts`
- Test: `src/test/smoke.test.ts`

**Interfaces:**
- Produces: 빌드 가능한 Next.js 앱(`npm run dev`/`build`), Tailwind 동작, `npm test`(vitest) 동작.

- [ ] **Step 1: 스캐폴드 생성**

기존 `docs/`·`.gitignore` 유지하며 현재 디렉터리에 생성:
```bash
cd ~/Desktop/heejoo-portfolio
npx create-next-app@latest . --ts --tailwind --app --src-dir --import-alias "@/*" --eslint --no-turbopack --use-npm
```
충돌 프롬프트 시 기존 파일 유지(docs/.gitignore). 완료 후 추가 의존성:
```bash
npm i framer-motion zustand @iconify/react
npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
```

- [ ] **Step 2: vitest 설정**

`vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", globals: true, setupFiles: ["./src/test/setup.ts"] },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
```
`src/test/setup.ts`:
```ts
import "@testing-library/jest-dom";
```
`package.json` scripts에 추가: `"test": "vitest run"`.

- [ ] **Step 3: 스모크 테스트 작성**

`src/test/smoke.test.ts`:
```ts
import { describe, it, expect } from "vitest";
describe("smoke", () => {
  it("runs", () => { expect(1 + 1).toBe(2); });
});
```

- [ ] **Step 4: 빌드·테스트 통과 확인**

Run: `npm run build && npm test`
Expected: 빌드 성공, 테스트 1 passed.

- [ ] **Step 5: 커밋**
```bash
git add -A && git commit -m "Next.js + Tailwind + Vitest 스캐폴드 구성"
```

---

### Task 2: 디자인 토큰 + 콘텐츠 데이터 모델

**Files:**
- Create: `src/content/profile.ts`, `src/content/experience.ts`, `src/content/projects.ts`, `src/content/files.ts`, `src/types/content.ts`
- Test: `src/content/content.test.ts`

**Interfaces:**
- Produces:
  - `interface Profile { name; role; years:number; email; github; phone; intro:string; stack:string[] }`
  - `interface ExperienceItem { company; team?; period; summary; bullets:string[] }`
  - `interface EducationItem { name; period }`
  - `interface Project { id; name; description; role; stack:string[]; period; links:{label;url}[]; status:"운영"|"종료" }`
  - `interface FileEntry { id; name; icon:string; kind:"tsx"|"md"|"json"|"ts" }` — `icon`은 @iconify 이름(예: `"vscode-icons:file-type-reactts"`).
  - `FILES: FileEntry[]` = home.tsx, about.md, projects.json, experience.ts, contact.tsx, github.md.

- [ ] **Step 1: 타입 정의** — `src/types/content.ts`에 위 인터페이스 작성(전부 export).

- [ ] **Step 2: 콘텐츠 데이터 작성**

`src/content/profile.ts`(예):
```ts
import type { Profile } from "@/types/content";
export const profile: Profile = {
  name: "이희주",
  role: "Frontend Developer",
  years: 4,
  email: "heejoo45890@gmail.com",
  github: "https://github.com/2huiju",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "", // 전화번호는 레포에 두지 않음(.env.local / Vercel 환경변수)
  intro: "기능 구현을 넘어 팀의 개발 환경과 구조를 설계하는 프론트엔드 개발자입니다.",
  stack: ["React", "Next.js", "TypeScript"],
};
```
`experience.ts`·`projects.ts`는 Global Constraints의 사실에 맞춰 작성(크레버스/크립티드/바오밥, 프로젝트 5개, 링크 tch.hummingo.ai·stu.hummingo.ai·hummingo.ai, KStadium/3SC는 status "종료"·링크 없음). `files.ts`에 `FILES` 배열 + 각 `icon`:
- home.tsx → `vscode-icons:file-type-reactts`
- about.md → `vscode-icons:file-type-markdown`
- projects.json → `vscode-icons:file-type-json`
- experience.ts → `vscode-icons:file-type-typescript`
- contact.tsx → `vscode-icons:file-type-reactts`
- github.md → `vscode-icons:file-type-markdown`

- [ ] **Step 3: 데이터 검증 테스트**

`src/content/content.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { FILES } from "@/content/files";

describe("content", () => {
  it("프로필 핵심 필드", () => {
    expect(profile.name).toBe("이희주");
    expect(profile.years).toBe(4);
    expect(profile.email).toContain("@");
  });
  it("프로젝트 5개 + 필수 필드", () => {
    expect(projects.length).toBe(5);
    for (const p of projects) { expect(p.name).toBeTruthy(); expect(Array.isArray(p.stack)).toBe(true); }
  });
  it("경력 3개", () => { expect(experience.length).toBe(3); });
  it("파일 6개 + iconify 이름", () => {
    expect(FILES.length).toBe(6);
    for (const f of FILES) { expect(f.icon).toMatch(/^vscode-icons:/); }
  });
});
```

- [ ] **Step 4: 테스트 통과 확인** — Run: `npm test` Expected: PASS.

- [ ] **Step 5: 커밋** — `git add -A && git commit -m "콘텐츠 데이터 모델과 포트폴리오 내용 정의"`

---

### Task 3: 반응형 분기 브레이크포인트 (Tailwind, JS 훅 X)

JS `matchMedia` 훅으로 트리를 갈아끼우지 않는다(하이드레이션 깜빡임·불필요한 클라이언트 로직). **Tailwind 반응형 유틸리티로 CSS 분기**한다. 데스크톱 셸과 iOS 홈 양쪽이 SSR HTML에 렌더되고, 화면 폭에 따라 CSS로 하나만 보인다(깜빡임 없음 + 둘 다 SEO 노출). 트레이드오프: 양쪽 트리가 마운트됨(포폴 규모에선 허용; 무거워지면 데스크톱 쪽만 지연 처리).

**Files:**
- Modify: `src/app/globals.css` (`@theme`에 커스텀 브레이크포인트 추가)

**Interfaces:**
- Produces: `desk:` Tailwind 변형(≥860px). 사용처(Task 9): `<div className="hidden desk:flex"><Desktop/></div>` + `<div className="desk:hidden"><IOSHome/></div>`.

- [ ] **Step 1: 브레이크포인트 선언** — `globals.css`의 `@theme inline`에 `--breakpoint-desk: 860px;` 추가.
- [ ] **Step 2: 빌드 확인** — Run: `npm run build` Expected: 성공(`desk:` 변형 인식).
- [ ] **Step 3: 커밋** — `git commit -am "Tailwind 커스텀 브레이크포인트로 반응형 분기"`

---

### Task 4: 메뉴바 + 실시간 시계

**Files:**
- Create: `src/components/desktop/MenuBar.tsx`, `src/lib/formatClock.ts`
- Test: `src/lib/formatClock.test.ts`

**Interfaces:**
- Consumes: `profile`(앱 이름 영역).
- Produces: `formatClock(date: Date): string` → 예 `"월 2:05 PM"`. `<MenuBar appName />`(상단 28px 고정, 블러, 좌측 로고/앱/메뉴, 우측 배터리·와이파이·검색 @iconify + 시계).

- [ ] **Step 1: 실패 테스트** (`formatClock`)
```ts
import { describe, it, expect } from "vitest";
import { formatClock } from "@/lib/formatClock";
it("오후 시간 포맷", () => {
  const d = new Date(2026, 5, 22, 14, 5); // 월요일
  expect(formatClock(d)).toBe("월 2:05 PM");
});
```
- [ ] **Step 2: 실패 확인** — Run: `npm test src/lib/formatClock.test.ts` Expected: FAIL.
- [ ] **Step 3: 구현** `formatClock`
```ts
const DAYS = ["일","월","화","수","목","금","토"];
export function formatClock(d: Date): string {
  const ap = d.getHours() < 12 ? "AM" : "PM";
  let h = d.getHours() % 12; if (h === 0) h = 12;
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${DAYS[d.getDay()]} ${h}:${m} ${ap}`;
}
```
- [ ] **Step 4: MenuBar 구현** — `"use client"`, `useEffect`로 1초마다 `new Date()` → `formatClock`. 우측 아이콘은 `<Icon icon="..."/>`(배터리/와이파이/검색은 @iconify에서 충실한 매칭 선정, 예 `material-symbols:battery-...`, `material-symbols:wifi`). 높이 28px, `bg-black/40 backdrop-blur-xl text-white`. 좌측: 사과 로고(@iconify `mdi:apple` 또는 SVG), 앱명 굵게, 메뉴 항목들.
- [ ] **Step 5: 테스트·빌드 확인** — Run: `npm test && npm run build` Expected: PASS/성공.
- [ ] **Step 6: 커밋** — `git commit -am "메뉴바와 실시간 시계 구현"`

---

### Task 5: 독(Dock) + 매그니피케이션 + 실제 앱 아이콘

**Files:**
- Create: `src/components/desktop/Dock.tsx`, `src/components/desktop/dockApps.ts`
- Test: `src/components/desktop/dockApps.test.ts`

**Interfaces:**
- Consumes: 창 열기 콜백(Task 7의 store action `openApp(id)`; MVP에선 VS Code만 실제 동작, 나머지는 비활성/툴팁만).
- Produces: `DOCK_APPS: {id;label;icon;enabled}[]`(VS Code enabled, 나머지 Phase2 disabled). `<Dock onOpen={(id)=>void} runningIds={string[]} />` — 호버 시 좌우 이웃까지 부드럽게 확대(Framer Motion `useMotionValue`로 커서 x 추적).

- [ ] **Step 1: dockApps 테스트**
```ts
import { describe, it, expect } from "vitest";
import { DOCK_APPS } from "@/components/desktop/dockApps";
it("VS Code는 활성, 7개 정의", () => {
  expect(DOCK_APPS.length).toBe(7);
  const vs = DOCK_APPS.find(a => a.id === "vscode");
  expect(vs?.enabled).toBe(true);
});
```
- [ ] **Step 2: 실패 확인** — Run: `npm test src/components/desktop/dockApps.test.ts` Expected: FAIL.
- [ ] **Step 3: dockApps 정의** — VS Code(`logos:visual-studio-code`), Terminal, Notes(About), Photos(Projects), Mail(Contact), Safari, GitHub(`logos:github-icon`). VS Code만 `enabled:true`. Apple 기본앱은 충실 SVG 또는 @iconify 근사 아이콘 사용(실제 에셋 우선).
- [ ] **Step 4: Dock 구현** — 하단 중앙 글래스 바(`bg-white/18 backdrop-blur-2xl rounded-[20px] border border-white/30`). 각 아이콘 48px, 호버 시 `scale` 매그니피케이션(커서와의 거리 기반), 툴팁(라벨), 실행중 인디케이터 점. `prefers-reduced-motion`이면 확대 생략. 클릭 시 `enabled`면 `onOpen(id)`.
- [ ] **Step 5: 테스트·빌드 확인** — Run: `npm test && npm run build` Expected: PASS/성공.
- [ ] **Step 6: 커밋** — `git commit -am "독과 매그니피케이션, 실제 앱 아이콘 구현"`

---

### Task 6: VS Code 앱 — 창 골격 + 콘텐츠 렌더러

**Files:**
- Create: `src/components/vscode/VSCodeApp.tsx`, `TitleBar.tsx`, `ActivityBar.tsx`, `Explorer.tsx`, `Tabs.tsx`, `Editor.tsx`, `StatusBar.tsx`, `src/components/vscode/files/HomeFile.tsx`, `AboutFile.tsx`, `ProjectsFile.tsx`, `ExperienceFile.tsx`, `ContactFile.tsx`, `GithubFile.tsx`, `src/components/vscode/useTyping.ts`
- Test: `src/components/vscode/useTyping.test.ts`, `src/components/vscode/VSCodeApp.test.tsx`

**Interfaces:**
- Consumes: `FILES`, 콘텐츠 데이터.
- Produces: `<VSCodeApp />`(내부에 열린 탭/활성 파일 상태). 파일별 렌더러는 `FILES`의 `id`로 매핑. `useTyping(lines:string[], speed?):string[]` — 줄 단위로 점진 노출(`prefers-reduced-motion`이면 즉시 전체 반환).

- [ ] **Step 1: useTyping 실패 테스트**
```ts
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useTyping } from "@/components/vscode/useTyping";
beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());
it("시간이 지나면 줄이 늘어난다", () => {
  const { result } = renderHook(() => useTyping(["a","b","c"], 100));
  expect(result.current.length).toBe(1);
  act(() => { vi.advanceTimersByTime(250); });
  expect(result.current.length).toBe(3);
});
```
- [ ] **Step 2: 실패 확인** — Run: `npm test src/components/vscode/useTyping.test.ts` Expected: FAIL.
- [ ] **Step 3: useTyping 구현** — `prefers-reduced-motion` 체크(matchMedia) 시 전체 즉시, 아니면 `setInterval`로 한 줄씩 push.
- [ ] **Step 4: 창 골격 구현** — TitleBar(신호등 3색 + 호버 시 ×−+ 글리프, 가운데 파일명), ActivityBar(48px, vscode-icons 계열 또는 codicon), Explorer(`FILES`로 트리, 각 줄 `<Icon icon={file.icon}/>` + 클릭 시 탭 열기/활성), Tabs(열린 파일 탭, 닫기 X), Editor(활성 파일 렌더러 표시 + 좌측 라인넘버 거터), StatusBar(🌿 대신 codicon git-branch + main, TS React, Prettier). One Dark/Default Dark+ 팔레트 변수화.
- [ ] **Step 5: 파일 렌더러 구현** — HomeFile(타이핑되는 신택스 하이라이트 `const heejoo = {...}` + export), AboutFile(마크다운 스타일 서사), ProjectsFile(projects.json을 실제 JSON 모양 + 카드/링크), ExperienceFile(타임라인), ContactFile(이메일/깃허브/전화 링크), GithubFile. 콘텐츠는 Task 2 데이터에서.
- [ ] **Step 6: 렌더 테스트**
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VSCodeApp } from "@/components/vscode/VSCodeApp";
it("기본으로 이름이 보인다", () => {
  render(<VSCodeApp />);
  expect(screen.getByText(/이희주/)).toBeInTheDocument();
});
it("Explorer에 파일 6개", () => {
  render(<VSCodeApp />);
  expect(screen.getByText("projects.json")).toBeInTheDocument();
});
```
- [ ] **Step 7: 테스트·빌드 확인** — Run: `npm test && npm run build` Expected: PASS/성공.
- [ ] **Step 8: 커밋** — `git commit -am "VS Code 창 골격과 파일별 콘텐츠 렌더러 구현"`

---

### Task 7: 창 관리 + 드래그 + 데스크톱 합성

**Files:**
- Create: `src/store/windows.ts`, `src/components/desktop/Window.tsx`, `src/components/desktop/Desktop.tsx`
- Test: `src/store/windows.test.ts`

**Interfaces:**
- Consumes: `VSCodeApp`, `MenuBar`, `Dock`.
- Produces: zustand store `useWindows` — `{ open:Record<id,{minimized:boolean}>, focus:string|null, openApp(id), closeApp(id), minimize(id), focusApp(id) }`. `<Window title onClose onMinimize>`(Framer Motion `drag`, 신호등 동작, 포커스 시 z-top). `<Desktop />`(바탕화면 + MenuBar + 열린 Window들 + Dock 합성). 초기 상태: vscode 열림·포커스.

- [ ] **Step 1: store 실패 테스트**
```ts
import { describe, it, expect, beforeEach } from "vitest";
import { useWindows } from "@/store/windows";
beforeEach(() => useWindows.getState().reset?.());
it("openApp/closeApp 동작", () => {
  const s = useWindows.getState();
  s.openApp("vscode"); expect(useWindows.getState().open["vscode"]).toBeTruthy();
  s.closeApp("vscode"); expect(useWindows.getState().open["vscode"]).toBeUndefined();
});
```
- [ ] **Step 2: 실패 확인** — Run: `npm test src/store/windows.test.ts` Expected: FAIL.
- [ ] **Step 3: store 구현** — 위 인터페이스대로. 초기 `open:{vscode:{minimized:false}}`, `focus:"vscode"`. `reset()` 포함(테스트용).
- [ ] **Step 4: Window 구현** — Framer Motion `motion.div drag dragMomentum={false}` 타이틀바 핸들(`dragControls`), 신호등(닫기→closeApp, 노랑→minimize, 초록→최대화 토글), 클릭 시 focusApp. `prefers-reduced-motion` 시 드래그는 유지하되 트랜지션 최소.
- [ ] **Step 5: Desktop 구현** — `min-h-screen` 그라데이션 바탕화면(프로토타입 톤 재사용 가능: indigo/teal/pink 블러), `<MenuBar appName="VS Code"/>`, 열린 앱이 vscode면 `<Window title="home.tsx — heejoo.dev">{<VSCodeApp/>}</Window>`, `<Dock onOpen={openApp} runningIds={Object.keys(open)}/>`.
- [ ] **Step 6: 테스트·빌드 확인** — Run: `npm test && npm run build` Expected: PASS/성공.
- [ ] **Step 7: 커밋** — `git commit -am "창 관리 store와 드래그 가능한 창, 데스크톱 합성"`

---

### Task 8: 모바일 iOS 홈화면

**Files:**
- Create: `src/components/ios/IOSHome.tsx`, `src/components/ios/AppSheet.tsx`
- Test: `src/components/ios/IOSHome.test.tsx`

**Interfaces:**
- Consumes: 콘텐츠 데이터, 파일 렌더러(재사용) 또는 섹션 컴포넌트.
- Produces: `<IOSHome />` — iOS 홈(상태바 시계·배터리, 앱 그리드=섹션 앱들, 하단 독). 앱 탭 → `<AppSheet>` 전체화면 시트로 해당 섹션. 닫기 제스처/버튼.

- [ ] **Step 1: 렌더 실패 테스트**
```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { IOSHome } from "@/components/ios/IOSHome";
it("앱 그리드에 About 앱", () => {
  render(<IOSHome />);
  expect(screen.getByText("About")).toBeInTheDocument();
});
it("앱 탭하면 시트가 열린다", () => {
  render(<IOSHome />);
  fireEvent.click(screen.getByText("About"));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});
```
- [ ] **Step 2: 실패 확인** — Run: `npm test src/components/ios/IOSHome.test.tsx` Expected: FAIL.
- [ ] **Step 3: 구현** — 앱들(Home/About/Projects/Experience/Contact/GitHub) 아이콘 그리드, 탭 시 `AppSheet`(role="dialog") 슬라이드업 + 콘텐츠. 상태바 시계는 `formatClock` 재사용. macOS와 통일된 그라데이션 배경·글래스 독.
- [ ] **Step 4: 통과 확인** — Run: `npm test src/components/ios/IOSHome.test.tsx` Expected: PASS.
- [ ] **Step 5: 커밋** — `git commit -am "모바일 iOS 홈화면과 앱 시트 구현"`

---

### Task 9: 페이지 조립 + 분기 + SEO/메타

**Files:**
- Modify: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`
- Create: `src/app/opengraph-image.tsx`(또는 정적 OG), `public/` 파비콘

**Interfaces:**
- Consumes: `useIsMobile`, `Desktop`, `IOSHome`.
- Produces: `/` 라우트가 폭에 따라 Desktop/IOSHome 렌더(`useIsMobile` null이면 데스크톱 기본 + 스켈레톤 무플리커 처리). `layout.tsx` metadata(title/description/OG), 폰트 스택.

- [ ] **Step 1: page 분기 구현** — `"use client"` 래퍼에서 `const m = useIsMobile(); return m ? <IOSHome/> : <Desktop/>;` (null 동안 Desktop). `overflow:hidden`, 전체 높이.
- [ ] **Step 2: metadata** — `layout.tsx`에 `export const metadata`(title "이희주 — Frontend Developer", description, openGraph, locale ko_KR). OG 이미지(데스크톱 미리보기 톤).
- [ ] **Step 3: 빌드 확인** — Run: `npm run build` Expected: 성공, `/` 정적 생성.
- [ ] **Step 4: Playwright 비주얼 검수** — `npm run dev` 후 데스크톱(1440)·모바일(390) 스크린샷 촬영해 깨짐/아이콘 tofu/레이아웃 확인. (아이콘이 실제로 렌더되는지 필수 확인.)
- [ ] **Step 5: 커밋** — `git commit -am "루트 페이지 분기와 SEO 메타 구성"`

---

### Task 10: Vercel 배포

**Files:**
- Create: `vercel.json`(필요 시), `README.md`

**Interfaces:**
- Produces: 공개 URL.

- [ ] **Step 1: 프로덕션 빌드 최종 확인** — Run: `npm run build` Expected: 성공.
- [ ] **Step 2: GitHub 레포 생성·푸시** — `gh repo create 2huiju/heejoo-portfolio --private --source=. --push`(사용자 확인 후).
- [ ] **Step 3: Vercel 연결** — `vercel`(또는 대시보드 import). 프레임워크 자동감지 Next.js. 배포 URL 확인.
- [ ] **Step 4: 배포 사이트 Playwright 검수** — 실제 URL 데스크톱/모바일 스크린샷으로 정상 동작 확인.
- [ ] **Step 5: 커밋·기록** — README에 URL·스택 정리, `git commit -am "README와 배포 정보 추가"`.

---

## Self-Review

**Spec coverage:** 컨셉(T6·T7), 사실적 아이콘(T2·T5·T6, Global Constraint), 콘텐츠 매핑(T2·T6), 데스크톱 셸(T4·T5·T7), VS Code 앱(T6), 모바일 iOS(T8), 기술스택(T1), MVP 범위(전체), 배포(T10) — 모두 태스크 존재. Phase2(독 앱 동작)·Phase3(부팅)은 의도적으로 범위 밖.
**Placeholder scan:** 핵심 로직(formatClock·useIsMobile·useTyping·store)은 전체 코드 포함. 비주얼 컴포넌트는 UI 특성상 구조+검증(빌드/Playwright)로 명시(순수 단위테스트 부적합 영역). "사실적 아이콘"은 @iconify 구체 이름으로 고정.
**Type consistency:** `openApp/closeApp/minimize/focusApp`, `FileEntry.icon`, `formatClock`, `useTyping`, `useIsMobile` 시그니처 태스크 간 일치 확인.

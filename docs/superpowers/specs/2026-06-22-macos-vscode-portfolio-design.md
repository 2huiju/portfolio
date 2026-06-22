# 이희주 포트폴리오 — macOS 데스크톱 + VS Code 컨셉 설계

> 작성일 2026-06-22 · 상태: 설계 확정 대기(사용자 리뷰 전)

## 1. 개요 / 컨셉

이희주(프론트엔드 4년차)의 배포용 포트폴리오 웹사이트. 기존 PDF 이력서/포트폴리오와 **별개의 매체**로, 사이트 자체가 프론트엔드 실력의 증명이 되는 것을 목표로 한다.

**핵심 컨셉: 브라우저 안에 재현한 macOS 데스크톱(껍데기) + 그 위에 열려 있는 VS Code 창(포트폴리오 본문).**

- "탐험하는 경험형"(Bruno Simon류)의 임팩트를, 자동차가 아닌 **개발자에게 자연스러운 메타포**(OS·코드 에디터)로 가져온다.
- 데스크톱 셸이 플레이풀함·"우와"를 담당하고, VS Code 창이 실제 콘텐츠를 개발자스럽게 전달한다.

### 반려된 대안 (왜 이 방향인가)
- 라이트/다크 스킨 4종, 비전형 레이아웃 4종(벤토·가로스크롤·캔버스·분할) → "스킨만 다르고 골격이 전형적·올드, 정적이라 싸 보임"으로 반려.
- 미니멀 거장형(rauno/emil/paco) → "구리다"로 반려. 3D방·OS·IDE 중 OS+IDE 채택.

### 레퍼런스
- OS: dustinbrett.com (daedalOS)
- IDE: vscode-portfolio.vercel.app (itsnitinr)
- 3D방(미채택): joanramosrefusta.com

## 2. 설계 원칙

1. **사실적으로 (최우선)**: macOS/VS Code UI를 픽셀 단위로 충실하게 재현. 프로토타입의 이모지 스탠드인은 본 구현에서 전부 실제 에셋으로 교체.
   - 파일 트리 아이콘: **Seti / vscode-icons** 실제 아이콘 세트(SVG). `.tsx`=React 하늘색, `.json`=`{}`, `.md`=마크다운 로고, `.ts`=TS 파랑 등 확장자별 정확히.
   - 독 앱 아이콘: **macOS Sequoia 앱 아이콘** 스타일(둥근 사각 superellipse + 정확한 그라데이션/심볼)을 충실 SVG로 재현, 가능하면 실제 에셋.
   - 메뉴바: 실제 **SF Symbols**(컨트롤센터·배터리·와이파이·검색) — macOS에서 SF Pro로 정확히 렌더.
   - 신호등(traffic lights), 창 그림자/블러(backdrop-filter), 독 글래스, 코너 라운드(superellipse) 모두 실제 macOS 수치에 맞춤.
2. **모션이 곧 완성도**: 창 드래그, 독 매그니피케이션, 타이핑, 실시간 시계, 창 열기/닫기 애니메이션 등 마이크로 인터랙션으로 "정적이라 싸 보임"을 제거.
3. **콘텐츠 우선**: 연출이 화려해도 채용 담당자가 핵심 정보(경력·프로젝트·연락처)에 빠르게 도달할 수 있어야 한다. 길 잃지 않도록 기본 상태에서 VS Code 창이 이미 열려 있고 home이 보인다.
4. **점진적 확장**: MVP(셸+VS Code) → Phase 2(독 앱들) → Phase 3(부팅 애니메이션 등). 각 단계가 독립적으로 배포 가능.

## 3. 아키텍처 / 컴포넌트

### 3.1 데스크톱 셸 (Desktop shell)
- `Desktop` — 바탕화면(그라데이션/이미지), 전역 z-index·포커스 관리, 열린 창 상태 보관.
- `MenuBar` — 상단 28px. 좌: 사과 로고 + 활성 앱 이름 + 메뉴(File/Edit/…). 우: 배터리·와이파이·검색·컨트롤센터·**실시간 시계**.
- `Dock` — 하단 글래스 바. 앱 아이콘 + 호버 매그니피케이션 + 툴팁 + 실행중 점(indicator).
- `WindowManager` / `Window` — 드래그 이동, 신호등(닫기/최소화/최대화), 포커스 시 최상단, 그림자.

### 3.2 VS Code 앱 (메인 콘텐츠)
- `VSCodeWindow` = `TitleBar`(신호등+파일명) + `ActivityBar`(좌측 48px 아이콘) + `Sidebar/Explorer`(파일 트리) + `EditorArea`(`Tabs` + `Editor` + `StatusBar`).
- `Editor`는 열린 "파일"에 따라 콘텐츠 렌더. 코드형 파일은 신택스 하이라이트 + 진입 시 타이핑 효과.

### 3.3 모바일 (iOS 홈화면)
- `IOSHome` — 폰 뷰포트에서 데스크톱 대신 렌더. 앱 그리드(앱=섹션), 상단 상태바(시계·배터리), 하단 독.
- 앱 탭 → 전체화면 시트(섹션 콘텐츠). macOS↔iOS 통일된 비주얼 언어.
- 분기 기준: CSS 미디어쿼리/`matchMedia`로 데스크톱 셸 vs iOS 홈 선택(둘 다 SSG로 빌드, 클라이언트에서 표시 전환).

## 4. 콘텐츠 모델 (파일 ↔ 내용 매핑)

VS Code Explorer의 "HEEJOO.DEV" 폴더 안 파일들. 각 파일이 포트폴리오 섹션:

| 파일 | 아이콘 | 내용 |
|---|---|---|
| `home.tsx` | React | 인트로(이름·역할·4년차·스택·한줄 소개), 타이핑 연출. 기본 열림. |
| `about.md` | Markdown | 자기소개·커리어 서사(3SC→크립티드→HUMMINGo 성장기), 강점. |
| `projects.json` | JSON | 프로젝트 배열: HUMMINGo, HUMMINGo-About, KStadium, KStadium Admin, 3 Seconds Club. 각 설명·역할·스택·링크(tch/stu/hummingo.ai). |
| `experience.ts` | TypeScript | 경력 3: 크레버스 AI Dev(2024.04~), 크립티드(2023.04–2024.03), 바오밥파트너즈(2022.09–2023.04). 교육 3. |
| `contact.tsx` | React | 이메일 heejoo45890@gmail.com, github.com/2huiju, 전화. |
| `github.md` | Markdown | GitHub 활동/링크(또는 README 형식 소개). |

> 콘텐츠 원문은 기존 백업(`~/Downloads/이력서_포트폴리오_원본/`)과 메모리 `project-resume-portfolio-2026-06`에서 가져온다. 정량 성과 없음 → 정성 문구.

### 독 앱 매핑 (Phase 2)
- VS Code(메인, Phase 1) · Terminal(`whoami`·`ls` 등 명령형 탐색) · Notes=About · Photos=Projects(스크린샷 갤러리, `~/Downloads/portfolio-images/`) · Mail=Contact · Safari=외부 링크 · GitHub.

## 5. 인터랙션
- **창**: 타이틀바 드래그 이동 / 신호등 닫기·최소화(독으로)·최대화 / 클릭 시 포커스 최상단. (리사이즈는 Phase 2.)
- **독**: 호버 매그니피케이션 + 툴팁, 클릭 시 해당 앱 창 열기/포커스, 실행중 인디케이터.
- **에디터**: 파일 클릭 → 탭 열림 + 콘텐츠 전환. 코드형은 타이핑 효과 1회.
- **메뉴바**: 실시간 시계. (드롭다운 메뉴는 장식/일부 동작 — Phase 2.)
- **부팅 애니메이션**(Phase 3, 선택): 첫 진입 시 사과 로고 부팅 → 데스크톱 페이드인.

## 6. 기술 스택
- **Next.js (App Router) + TypeScript**, **SSG**(콘텐츠 고정), **Vercel** 배포.
- 스타일: **Tailwind CSS**(+ 필요한 곳 CSS Module/변수). 디자인 토큰화.
- 애니메이션/드래그: **Framer Motion**(드래그·창 전환) 또는 경량 커스텀. 과한 라이브러리 지양.
- 아이콘: vscode-icons/Seti SVG, macOS 앱아이콘 SVG, SF Symbols(시스템 폰트).
- 폰트: `-apple-system`/SF Pro 스택 + 코드 영역 SF Mono/JetBrains Mono. 한글 Pretendard 폴백.
- 상태: 열린 창/포커스/활성 파일은 가벼운 클라이언트 상태(zustand 또는 Context). 서버 데이터 없음.

## 7. 범위 / 단계

### MVP (Phase 1) — 이번 배포 목표
- 데스크톱 셸: 바탕화면 + 메뉴바(시계 동작) + 독(매그니피케이션, 아이콘은 실제 에셋).
- VS Code 창: 신택스/타이핑/탭/사이드바 + **모든 콘텐츠 파일 완성**(home/about/projects/experience/contact/github).
- 창 드래그·신호등(최소한 닫기/포커스).
- **모바일 iOS 홈화면** 폴백.
- 실제 아이콘 에셋 적용(이모지 제거), 반응형, 기본 SEO/메타·OG.
- Vercel 배포.

### Phase 2
- 독 앱들 실제 동작(Terminal·Notes·Photos·Mail·Safari·GitHub 창).
- 창 리사이즈·최대화·다중 창·z-order 정교화. 메뉴바 드롭다운.

### Phase 3 (선택)
- 부팅 애니메이션, 컨트롤센터/위젯, 테마 전환(라이트/다크), 사운드.

## 8. 범위 밖 (YAGNI)
- 진짜 파일시스템/터미널 셸, 실제 멀티태스킹 OS, 3D, 로그인/CMS, 다국어(우선 한국어. 영문은 후순위 검토).

## 9. 리스크 / 메모
- macOS 충실 재현은 디테일 노동집약적 → 아이콘/수치는 실제 레퍼런스 캡처 대조하며 작업.
- 접근성: OS 메타포라도 키보드 포커스/시맨틱 최소 보장, `prefers-reduced-motion` 존중.
- 성능: 블러·그림자 과다 시 모바일 저사양 부담 → iOS 홈은 경량 유지.

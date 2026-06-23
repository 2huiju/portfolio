# 이희주 — Portfolio

브라우저 안에 재현한 **macOS 데스크톱 + VS Code** 컨셉의 프론트엔드 포트폴리오입니다.
데스크톱에서는 창을 드래그·리사이즈하고 독에서 앱을 열어 둘러보고, 모바일에서는 iOS 홈 화면으로 전환됩니다.

> 🔗 Live: **https://huiju.vercel.app**

## ✨ 특징

- **macOS 데스크톱 셸** — 실시간 시계 메뉴바, 매그니피케이션 독(실제 macOS 앱 아이콘), 드래그·리사이즈·신호등 창
- **VS Code 앱** — 파일 탐색기·탭·신택스 하이라이트·타이핑 연출로 포트폴리오를 코드처럼 탐색
- **콘텐츠** — 프로젝트별 문제·해결·결과, 경력 타임라인, 스킬, 연락처
- **반응형** — 데스크톱은 macOS, 모바일(<860px)은 iOS 홈 화면 (CSS 브레이크포인트 분기)

## 🛠 기술 스택

Next.js 16 (App Router · SSG) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Zustand · @iconify/react · Vitest · Yarn Berry · Vercel

## 🚀 실행

```bash
corepack enable          # Yarn Berry
yarn install
yarn dev                 # http://localhost:3000
yarn test                # Vitest
yarn build               # 프로덕션 빌드
```

## 📁 구조

```
app/            # Next.js App Router (layout, page)
components/
  desktop/      # 데스크톱 셸 (MenuBar, Dock, Window, Desktop)
  vscode/       # VS Code 앱 (Explorer, Tabs, Editor, 파일별 렌더러)
  ios/          # 모바일 iOS 홈 (IOSHome, AppSheet)
content/        # 포트폴리오 콘텐츠 데이터 (profile, projects, experience)
store/          # zustand (windows, vscode)
public/icons/   # 실제 macOS 앱 아이콘
```

## 🔐 환경 변수

전화번호 등 민감 정보는 레포에 두지 않습니다. `.env.example`를 참고해 `.env.local`(로컬)·Vercel 환경 변수에 설정하세요.

```
NEXT_PUBLIC_PHONE=   # 선택. 설정 시 Contact에 노출(클라이언트 공개)
```

# 이희주 — Frontend Engineer Portfolio

브라우저 안에 **macOS 데스크톱 · VS Code**를 재현한 인터랙티브 프론트엔드 포트폴리오입니다.
데스크톱에서는 창을 드래그·리사이즈하고 독에서 앱을 열어 둘러보고, 모바일에서는 **iOS 홈 화면**으로 전환됩니다.

> 🔗 **Live — https://huiju.vercel.app**

<!-- 스크린샷: docs/screenshot-desktop.png / docs/screenshot-ios.png 추가 후 아래 주석 해제 -->
<!-- ![데스크톱](docs/screenshot-desktop.png) -->

---

## ✨ 컨셉

포트폴리오 콘텐츠를 "읽는" 게 아니라 **OS처럼 조작하며 탐색**하도록 설계했습니다.

- **macOS 데스크톱 셸** — 실시간 시계 메뉴바, 매그니피케이션 독(실제 macOS 앱 아이콘), 드래그·리사이즈·신호등 창
- **VS Code 앱** — 파일 탐색기·탭·신택스 하이라이트·타이핑 연출로 이력을 코드처럼 열람 (`About`, `Projects`, `Experience`, `Contact`)
- **iOS 홈 화면** — 모바일(<860px)에서는 앱 아이콘 그리드 + 앱 시트로 전환 (CSS 브레이크포인트 분기, JS 디바이스 감지 없음)

## 🧑‍💻 대표 프로젝트

콘텐츠는 `content/`의 타입드 데이터(`projects.ts` 등)에서 렌더링됩니다. 각 프로젝트는 문제 → 해결 → 결과로 정리돼 있습니다.

| 프로젝트 | 기간 | 핵심 |
|---|---|---|
| **HUMMINGo** (크레버스) | 2024.04 ~ 재직 중 | 결제·구독 시스템, 인증·권한 미들웨어, 마켓플레이스 구독·온보딩 플로우, 다국어(i18n) 운영 자동화 파이프라인 |
| **HUMMINGo-About** (크레버스) | 2025.04 ~ 재직 중 | 메인 FE에서 About·블로그 영역 레포 분리, 비로그인 체험 평가(Demo Evaluation), 다국어 라우팅·SEO |
| **KStadium** (크립티드) | 2023.04 ~ 2024.03 | 커뮤니티·투자 앱 개발 & 레거시 마이그레이션, 배포 자동화, Web→App 푸시 알림, 자산 거래 웹(Athene Swap)·어드민 |
| **3 Seconds Club** (바오밥파트너즈) | 2022.09 ~ 2023.04 | Flutter 단일 코드베이스 iOS·Android, web3dart 온체인 트랜잭션, ENS 기반 실시간 메신저, OTC 에스크로 |

## 🛠 기술 스택

**Next.js 16** (App Router · SSG) · **React 19** · **TypeScript** · **Tailwind CSS v4** · **Framer Motion** · **Zustand** · @iconify/react · **Vitest** · **Yarn Berry** · Vercel

## 🚀 실행

```bash
corepack enable          # Yarn Berry 활성화
yarn install
yarn dev                 # http://localhost:3000
yarn test                # Vitest (컴포넌트·스토어·유틸 단위 테스트)
yarn build               # 프로덕션 빌드 (SSG)
```

## 📁 구조

```
app/                # Next.js App Router (layout, page — 반응형 데스크톱/iOS 분기)
components/
  desktop/          # 데스크톱 셸 (MenuBar · Dock · Window · Desktop)
  vscode/           # VS Code 앱 (ActivityBar · Explorer · Tabs · Editor · StatusBar)
    files/          # 파일별 렌더러 (About · Projects · Experience · Contact · Home · Github)
  ios/              # 모바일 iOS 홈 (IOSHome · AppSheet)
content/            # 포트폴리오 콘텐츠 데이터 (profile · projects · experience · files)
store/              # zustand (windows · vscode)
lib/                # 유틸 (formatClock 등)
types/              # 콘텐츠 타입 정의
public/icons/       # 실제 macOS 앱 아이콘
```

> 콘텐츠와 UI를 분리했습니다 — 이력 변경은 `content/`의 데이터만 수정하면 셸·VS Code·iOS 어디서든 동일하게 반영됩니다.

## 🔐 환경 변수

전화번호 등 민감 정보는 레포에 커밋하지 않습니다. `.env.example`를 참고해 `.env.local`(로컬)·Vercel 환경 변수에 설정하세요.

```
NEXT_PUBLIC_PHONE=   # 선택. 설정 시 Contact에 노출(클라이언트 공개)
```

## 📮 Contact

[![Portfolio](https://img.shields.io/badge/Portfolio-huiju.vercel.app-8B5CF6?style=for-the-badge&logo=vercel&logoColor=white)](https://huiju.vercel.app)

- GitHub — [@2huiju](https://github.com/2huiju)
- Email — heejoo45890@gmail.com

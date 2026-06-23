import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    id: "hummingo",
    name: "HUMMINGo",
    org: "크레버스",
    tagline:
      "루브릭 기반 AI로 논·서술형 과제를 단 10초 만에 채점해 선생님의 평가 부담을 덜어주는 AI 평가 플랫폼",
    period: "2024.04 ~ 재직 중",
    role: "프론트엔드 개발",
    team: "기획 2 · 디자인 1 · FE 2 · BE 3 · DevOps 1",
    status: "운영",
    stack: [
      "React",
      "Next.js (App Router · RSC)",
      "TypeScript",
      "TanStack Query",
      "Jotai",
      "React Hook Form",
      "Tailwind CSS",
      "Style Dictionary",
      "TossPayments",
      "React-PDF",
      "Playwright",
      "Yarn Berry",
    ],
    summary:
      "Next.js App Router(RSC)와 BFF 패턴으로 서버 환경변수를 보호하고, 서버·클라이언트 상태를 TanStack Query / Jotai로 분리해 관리했습니다.",
    highlights: [
      {
        title: "결제·구독 시스템 구축",
        problem:
          "교사용 SaaS의 유료 전환을 위해 빌링키 정기결제·플랜 변경·좌석 단위 초대 결제 등 시나리오가 다양했고, 외부 결제사·구독 상태와 어긋나지 않게 처리해야 했습니다.",
        solution:
          "TossPayments 빌링키로 자동결제를 구현하고, 신규 구매·플랜 변경·좌석 초대 3가지 플로우를 단일 훅(usePlanPaymentPage)에서 분기해 중복을 제거했습니다. 결제·구독·청구 상태는 BFF로 프록시하고, 청구서는 React-PDF로 서버 렌더링했습니다.",
        result:
          "흩어져 있던 복잡한 결제 시나리오를 하나의 구조로 통합해 안정성과 유지보수성을 높였고, 이후 새 결제 케이스도 기존 분기를 재사용할 수 있는 확장 기반을 마련했습니다.",
      },
      {
        title: "인증·권한 미들웨어 구축",
        problem:
          "교사(tch)·학생(stu) 포털이 서브도메인으로 분리되고 조직·플랜·구독 상태에 따라 접근 제어가 달라지는데, accessToken 만료 때마다 갱신 요청이 발생해 불필요한 왕복과 화면 깜빡임이 있었습니다.",
        solution:
          "Google·Microsoft OAuth를 BFF로 연동해 토큰을 서버에서만 다루고, 미들웨어에서 만료를 감지하면 refreshToken으로 즉시 갱신해 새 토큰을 요청 헤더에 주입, 서버 컴포넌트가 추가 호출 없이 최신 토큰으로 fetch하도록 설계했습니다. 다단계 접근 가드도 미들웨어 한 곳으로 일원화했습니다.",
        result:
          "토큰 갱신으로 인한 중복 호출과 화면 깜빡임을 제거하고, 권한 로직 응집도를 높여 새 접근 규칙도 한 지점만 수정하면 되는 예측 가능한 구조를 만들었습니다.",
      },
      {
        title: "마켓플레이스 구독·온보딩 플로우 구축",
        problem:
          "Microsoft 마켓플레이스 구독 사용자를 서비스 온보딩으로 안전하게 연결해야 했고, 구독 상태(활성·대기·실패)에 따라 진입 동선이 달라져야 했습니다.",
        solution:
          "구독 → 온보딩 진입 플로우를 BFF로 신규 설계해 외부 구독·결제 상태를 서버에서만 검증하고, 상태별로 단계를 분기했습니다. 예외는 공통 에러 라우트(reason 파라미터 분기)로 모아 중복 에러 페이지를 제거했습니다.",
        result:
          "외부 연동 보안을 확보하고 예외 흐름을 일관되게 만들어, 온보딩이 안정화되고 예외 상황에서도 사용자가 길을 잃지 않는 경험을 제공했습니다.",
      },
      {
        title: "다국어(i18n) 운영 자동화 파이프라인 구축",
        problem:
          "번역을 수작업으로 반영하다 보니 오타·키 누락이 잦았고, 번역 관리 쪽과 개발 사이 커뮤니케이션 비용이 컸습니다.",
        solution:
          "OneDrive 번역 xlsx를 파싱해 Azure Blob CDN으로 푸시하는 CLI를 직접 개발했습니다. 공통·선생님·학생 시트를 키 단위로 diff하고 dry-run으로 검증한 뒤 업로드하며, 번역 키를 union 타입으로 자동 생성해 잘못된 키를 타입 단계에서 차단했습니다.",
        result:
          "키 단위 diff·dry-run으로 잘못된 번역 배포를 사전 차단하고, 번역 관리자와 개발자가 같은 도구에서 협업하게 되어 수작업 커뮤니케이션 비용을 크게 줄였습니다.",
      },
    ],
    retrospective:
      "2년차에서 4년차로 성장하며 가장 깊이 몰입한 프로젝트입니다. 결제·인증처럼 보이지 않는 영역일수록 안정성과 구조 설계가 중요하다는 것을 배웠고, 기능 구현을 넘어 E2E·다국어 자동화처럼 팀 차원의 개발 환경까지 설계하는 쪽으로 역할을 넓혔습니다. Claude Code·Figma MCP 워크플로우를 팀에 도입하며 '팀이 더 잘 일하는 방식'을 만드는 개발자로 성장했다고 느낍니다.",
    links: [
      { label: "teacher", url: "https://tch.hummingo.ai" },
      { label: "student", url: "https://stu.hummingo.ai" },
    ],
  },
  {
    id: "hummingo-about",
    name: "HUMMINGo-About",
    org: "크레버스",
    tagline:
      "메인 서비스에서 분리한 소개·체험 평가·블로그 사이트 — 다국어 SEO와 비로그인 체험을 책임지는 마케팅 프론트",
    period: "2025.04 ~ 재직 중",
    role: "프론트엔드 개발",
    team: "기획 1 · 디자인 1 · FE 1 · BE 2 · DevOps 1",
    status: "운영",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "TanStack Query",
      "Jotai",
      "Tailwind CSS",
      "DOMPurify",
      "Ghost CMS",
      "GA4",
      "Yarn Berry",
    ],
    summary:
      "app/[locale] 동적 라우팅으로 다국어 SEO에 대응하고, 외부 콘텐츠(Ghost)는 BFF로 프록시·새니타이징해 안전하게 노출했습니다.",
    highlights: [
      {
        title: "메인 프론트엔드에서 About·블로그 영역 레포 분리",
        problem:
          "마케팅 페이지가 교사·학생 서비스가 든 메인 앱에 섞여 있어, 페이지 하나를 고쳐도 전체를 빌드·배포해야 했고 변경 위험이 컸습니다.",
        solution:
          "About·Ghost 블로그 코드와 자산을 메인 레포에서 추출해 독립 배포 가능한 Next.js 앱으로 분리했습니다. 누락을 막으려 untracked·modified 전체를 diff 기준으로 옮겼고, Ghost API는 BFF로 프록시하고 isomorphic-dompurify로 외부 HTML을 새니타이징해 XSS를 차단했습니다.",
        result:
          "마케팅 영역을 떼어내 빌드 범위와 배포 리스크를 줄였고, 마케팅 변경이 핵심 서비스 배포에 영향을 주지 않는 구조를 확보했습니다.",
      },
      {
        title: "비로그인 체험 평가(Demo Evaluation) 개발",
        problem:
          "랜딩 방문자가 가입·로그인 없이도 'AI가 10초 만에 채점한다'는 핵심 가치를 직접 체감할 동선이 필요했습니다.",
        solution:
          "작문 유형·학년 선택 시 샘플 에세이를 자동 생성(직전 중복 방지)하고, 제출을 BFF로 프록시해 AI 채점 결과를 받아왔습니다. 0~1 점수를 0~100·4단계로 시각화하고 루브릭·피드백·예시를 탭 UI로 보여주며, 결과는 Jotai atom으로 전달하고 데이터가 없으면 안전하게 리다이렉트했습니다.",
        result:
          "가입 없이 AI 채점을 직접 경험하는 전환 동선을 제공해, '설명하는 서비스'가 아닌 '써보고 가치를 느끼는 서비스'로 만들었습니다.",
      },
      {
        title: "다국어 라우팅·국제화(i18n) & SEO",
        problem: "ko/en 다국어를 지원하면서 검색 유입을 위한 언어별 메타·정규 URL까지 챙겨야 했습니다.",
        solution:
          "app/[locale] 동적 라우팅과 generateStaticParams로 언어별 페이지를 만들고, locale을 헤더 → 쿠키 → Accept-Language 순으로 폴백했습니다. 다국어 JSON은 CDN에서 ETag 기반 변경분만 동기화하고, generateMetadata로 canonical·hreflang(x-default 포함)을 자동 생성했습니다.",
        result:
          "키 누락·오타를 타입 단계에서 차단해 번역 안정성을 높이고, canonical·hreflang 자동화로 다국어 SEO에 대응했습니다.",
      },
    ],
    retrospective:
      "'마케팅 프론트'라는 역할을 처음 깊이 경험한 프로젝트입니다. 잘 보이고(SEO) 빠르게 체험되는(전환) 것이 곧 비즈니스 임팩트임을 체감했고, 같은 제품이라도 보는 사람(잠재 고객 vs 사용 고객)에 따라 완전히 다른 설계가 필요하다는 관점을 얻었습니다.",
    links: [{ label: "landing", url: "https://hummingo.ai" }],
  },
  {
    id: "kstadium",
    name: "KStadium",
    org: "크립티드",
    tagline: "커뮤니티 기반 투자 플랫폼 — 앱·모바일 웹·운영 어드민까지 프론트엔드 전 영역을 담당",
    period: "2023.04 ~ 2024.03",
    role: "프론트엔드 개발",
    team: "기획 3 · 디자인 3 · FE 4 · BE 3 · DevOps 1",
    status: "종료",
    stack: [
      "React",
      "React Native",
      "Next.js",
      "TypeScript",
      "TanStack Query",
      "Redux",
      "Zustand",
      "styled-components",
      "Fastlane",
      "FCM",
    ],
    summary:
      "React로 개발한 앱을 React Native 셸로 패키징해 iOS·Android에 배포하고, 연동 서비스(Athene Swap)는 Next.js로 구현했습니다.",
    highlights: [
      {
        title: "커뮤니티·투자 앱 개발 & 레거시 마이그레이션",
        problem:
          "기존 서비스가 Ionic 하이브리드 구조라 빌드·디버깅이 느렸고, 늘어나는 기능 대비 생산성과 유지보수성이 떨어졌습니다.",
        solution:
          "지갑(송금·연동)·투표·투자·푸시 등 핵심 기능을 구현하며 Ionic·React 코드를 React 기반으로 재구성했습니다. 서버 상태를 Redux → React Query로 전환하고, Yarn 2.x → Yarn Berry 업그레이드로 의존성·빌드 시간을 줄였습니다.",
        result:
          "레거시를 현대화해 빌드 시간을 줄이고, 반복 모달을 공통 컴포넌트로 모듈화해 이후 기능 개발 속도까지 끌어올렸습니다.",
      },
      {
        title: "배포 프로세스 자동화 & 출시 관리",
        problem: "매 배포를 수동으로 진행해 시간이 오래 걸리고 실수 위험이 있었으며, iOS 인증서 관리도 번거로웠습니다.",
        solution:
          "직접 불편함을 느껴 배포 자동화를 학습한 뒤 Fastlane으로 빌드·배포를 자동화하고 Match로 인증서를 팀이 공유하도록 체계화했습니다. 프로세스를 문서화하고 팀 교육까지 진행했습니다.",
        result:
          "배포 시간을 단축하고 누구나 동일하게 배포할 수 있는 환경을 만든 결과, 앱 배포·출시 관리자 역할을 맡게 되었습니다.",
      },
      {
        title: "Web to App 푸시 알림 구현",
        problem: "웹뷰 기반 크로스플랫폼 환경에서는 네이티브 대비 푸시 표현(이미지·GIF)이 제한적이었습니다.",
        solution:
          "FCM 기반으로 웹 어드민 발송 → 앱 수신되는 실시간·예약 푸시 구조를 구현하고, iOS·Android 네이티브 확장을 추가해 JS 브릿지로 이미지·GIF 알림까지 표현했습니다.",
        result:
          "크로스플랫폼의 한계를 네이티브 확장으로 넘어 풍부한 푸시를 보낼 수 있게 해, 전달력과 재방문 유도에 기여했습니다.",
      },
      {
        title: "자산 거래 웹(Athene Swap) · 운영 어드민",
        solution:
          "KStadium 계정과 연동해 자산을 거래·교환하는 모바일 웹을 Next.js 13으로 구현(Zustand 전역 상태, React Query 시세·잔액 동기화)하고, 사용자·앱·콘텐츠 운영을 위한 어드민(검색·강제탈퇴, 버전·점검·푸시, 공지·커뮤니티 관리)을 함께 개발했습니다.",
        result: "실시간 자산 금액을 신뢰할 수 있는 거래 경험과, 서비스 운영을 지원하는 어드민을 제공했습니다.",
      },
    ],
    retrospective:
      "앱·운영 어드민·연동 웹까지 프론트엔드 전 영역을 경험하며 시야가 넓어진 시기입니다. 반복되던 수동 배포를 'Fastlane 자동화 + 프로세스 정의 + 팀 교육'이라는 일하는 방식의 변화로 풀었을 때 팀 전체 생산성이 오르는 것을 직접 확인했고, 문제를 개별 기능이 아니라 구조와 협업 방식의 관점에서 해결한다는 방향성이 분명해졌습니다.",
    links: [],
  },
  {
    id: "3sc",
    name: "3 Seconds Club",
    org: "바오밥파트너즈",
    tagline: "블록체인 지갑·ENS 기반 실시간 메신저·OTC 거래를 결합한 Web3 모바일 앱",
    period: "2022.09 ~ 2023.04",
    role: "프론트엔드 (Flutter)",
    team: "기획 1 · 디자인 1 · FE 2 · BE 2",
    status: "종료",
    stack: ["Flutter", "Dart", "Riverpod", "go_router", "Dio", "web3dart", "Socket.IO", "FCM"],
    summary: "Flutter 단일 코드베이스로 iOS·Android 앱을 개발하고, web3dart로 온체인 트랜잭션을 처리했습니다.",
    highlights: [
      {
        title: "블록체인 지갑 기능 개발",
        problem: "지갑 앱 특성상 개인키와 자산을 안전하게 보관·복구하면서 온체인 송금·조회까지 지원해야 했습니다.",
        solution:
          "니모닉 기반 HD 지갑 생성·복구(BIP39/BIP32-44)를 구현하고 개인키는 flutter_secure_storage에 저장했습니다. web3dart로 온체인 트랜잭션을 서명·전송하고 잔액을 조회하며, QR로 주소를 공유·스캔하는 송금 플로우를 구성했습니다.",
        result:
          "개인키 보관부터 온체인 송금·조회까지 핵심 보안·거래 기능을 안정적으로 구현하며, 민감 정보를 안전하게 다루는 구조의 중요성을 체득했습니다.",
      },
      {
        title: "ENS 기반 실시간 메신저 개발",
        problem: "긴 지갑 주소는 식별·기억이 어려웠고, 사용자 간 실시간 대화 경험이 필요했습니다.",
        solution:
          "Socket.IO·WebSocket으로 실시간 채팅을 구현하고, 읽기 어려운 주소 대신 ENS 주소로 상대를 식별·검색하는 주소록·채팅방 구조를 설계했습니다. 채팅방 생성·QR 초대, 즐겨찾기·차단·금칙어 필터도 구현했습니다.",
        result: "ENS 주소로 상대를 식별하는 직관적인 실시간 메신저 경험을 제공해, 지갑과 소통이 자연스럽게 이어지도록 했습니다.",
      },
      {
        title: "OTC 에스크로 거래 · 보안 · 푸시",
        solution:
          "입금 → 거래 정보 확인 → 정산으로 이어지는 에스크로 기반 P2P 거래 플로우를 구현하고, 생체 인증(local_auth)·앱 잠금 보안과 FCM·로컬 알림 기반 푸시·뱃지 처리를 구성했습니다.",
        result: "에스크로 거래·생체 인증·푸시까지, 성격이 다른 기능들을 하나의 안정적인 사용자 경험으로 묶어냈습니다.",
      },
    ],
    retrospective:
      "개발자로 참여한 첫 프로젝트입니다. 성격이 전혀 다른 도메인(지갑·메신저·OTC)을 한 앱에 담으며 '동작하는 것'을 넘어 '안전하고 구조적으로 동작하는 것'을 처음 고민했고, 블록체인이라는 낯선 기술을 빠르게 학습해 실제로 구현해내며 '모르는 영역도 끝까지 파고들면 만들어낼 수 있다'는 자신감을 얻었습니다.",
    links: [],
  },
];

import { Desktop } from "@/components/desktop/Desktop";
import { IOSHome } from "@/components/ios/IOSHome";

// 데스크톱(≥860px)은 macOS 셸, 모바일은 iOS 홈. CSS 브레이크포인트로 분기(JS 없음).
export default function Page() {
  return (
    <>
      <div className="hidden desk:block">
        <Desktop />
      </div>
      <div className="desk:hidden">
        <IOSHome />
      </div>
    </>
  );
}

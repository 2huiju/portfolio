import { profile } from "@/content/profile";
import { MdDoc, H1, H2, Pp, Ul, Strong } from "./md";

export function AboutFile() {
  return (
    <MdDoc>
      <H1># About</H1>
      <Pp>
        안녕하세요, <Strong>기능 구현을 넘어 팀이 잘 일할 수 있는 토대를 만드는</Strong> 프론트엔드 개발자
        이희주입니다.
      </Pp>

      <H2>성장 서사</H2>
      <Pp>
        <Strong>3 Seconds Club</Strong>는 커리어의 출발점이었습니다. Flutter로 첫 제품을 만들며 &ldquo;내가 쓴 코드가
        곧 책임&rdquo;이라는 걸 처음 체감했습니다.
      </Pp>
      <Pp>
        <Strong>크립티드(KStadium)</Strong>에서는 문제를 구조와 프로세스로 푸는 방향을 익혔습니다. 기존 Ionic 기반을
        React로 재구성하고, 웹을 React Native 셸로 패키징해 배포하며 &ldquo;어떻게 만들지&rdquo;의 기준을 세웠습니다.
      </Pp>
      <Pp>
        <Strong>크레버스(HUMMINGo)</Strong>에서는 2년차에서 4년차로 성장했습니다. 기능 구현을 넘어 다국어 구조, BFF
        외부 연계, E2E 테스트 전략 등 <Strong>팀의 개발 환경 자체를 설계</Strong>하는 일로 역할을 넓혔습니다.
      </Pp>

      <H2>지향</H2>
      <Ul>
        <li>사용자가 머무는 화면과, 팀이 빠르게 일하는 토대를 함께 만든다.</li>
        <li>당장 동작하는 코드보다, 왜 이 구조인지 설명할 수 있는 코드를 쓴다.</li>
        <li>낯선 도메인도 빠르게 학습해 내 것으로 만든다.</li>
      </Ul>

      <H2>기술 스택</H2>
      <div className="space-y-2">
        {profile.skillGroups.map((g) => (
          <div key={g.label} className="flex flex-wrap items-baseline gap-2">
            <span className="w-24 shrink-0 text-[13px] font-semibold text-ctp-text">{g.label}</span>
            <span className="flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <span key={s} className="rounded-md bg-ctp-surface/70 px-2 py-0.5 text-[12px] text-ctp-subtext">
                  {s}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </MdDoc>
  );
}

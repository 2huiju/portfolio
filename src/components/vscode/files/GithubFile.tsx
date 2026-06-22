import { profile } from "@/content/profile";
import { MdDoc, H1, Pp, Strong } from "./md";

export function GithubFile() {
  const handle = profile.github.replace(/^https?:\/\//, "");
  return (
    <MdDoc>
      <H1># GitHub</H1>
      <Pp>
        코드와 기록은 GitHub에 있습니다. 사이드 프로젝트와 실험도 이곳에 쌓고 있어요.
      </Pp>
      <Pp>
        <Strong>프로필: </Strong>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ctp-blue underline-offset-2 hover:underline"
        >
          {handle}
        </a>
      </Pp>
      <Pp className="text-ctp-overlay">
        이 포트폴리오 사이트도 Next.js로 직접 만들어 같은 계정에 공개해 두었습니다.
      </Pp>
    </MdDoc>
  );
}

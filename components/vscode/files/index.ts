import type { ComponentType } from "react";
import { HomeFile } from "./HomeFile";
import { AboutFile } from "./AboutFile";
import { ProjectsFile } from "./ProjectsFile";
import { ExperienceFile } from "./ExperienceFile";
import { ContactFile } from "./ContactFile";
import { GithubFile } from "./GithubFile";

// 파일 id → 콘텐츠 렌더러
export const FILE_RENDERERS: Record<string, ComponentType> = {
  home: HomeFile,
  about: AboutFile,
  projects: ProjectsFile,
  experience: ExperienceFile,
  contact: ContactFile,
  github: GithubFile,
};

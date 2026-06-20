import React from 'react';
import { Helmet } from 'react-helmet';
import { useWorkspace } from '@/hooks/use-workspace.jsx';
import { useHotkeys } from '@/hooks/use-hotkeys.jsx';
import TitleBar from '@/components/ide/TitleBar.jsx';
import ActivityBar from '@/components/ide/ActivityBar.jsx';
import FileExplorer from '@/components/ide/FileExplorer.jsx';
import EditorTabs from '@/components/ide/EditorTabs.jsx';
import StatusBar from '@/components/ide/StatusBar.jsx';
import Terminal from '@/components/ide/Terminal.jsx';
import CommandPalette from '@/components/ide/CommandPalette.jsx';
import AboutMd from '@/components/files/AboutMd.jsx';
import ExperienceJson from '@/components/files/ExperienceJson.jsx';
import EducationYml from '@/components/files/EducationYml.jsx';
import SkillsTs from '@/components/files/SkillsTs.jsx';
import ProjectsTsx from '@/components/files/ProjectsTsx.jsx';
import ContactSh from '@/components/files/ContactSh.jsx';
import { cv } from '@/data/cv.js';

const HomePage = () => {
  const { scrollerRef, openTabs } = useWorkspace();
  useHotkeys();

  const sectionMap = {
    about: AboutMd,
    experience: ExperienceJson,
    education: EducationYml,
    skills: SkillsTs,
    projects: ProjectsTsx,
    contact: ContactSh,
  };

  return (
    <>
      <Helmet>
        <title>{cv.identity.name} — {cv.identity.role}</title>
        <meta
          name="description"
          content={`CV of ${cv.identity.name}, ${cv.identity.role}. ${cv.identity.tagline}`}
        />
      </Helmet>

      <div className="h-screen w-screen flex flex-col bg-[var(--chrome-titlebar)] text-[var(--chrome-fg)] overflow-hidden">
        <TitleBar />

        <div className="flex-1 flex min-h-0">
          <ActivityBar />
          <FileExplorer />

          <main className="flex-1 flex flex-col min-w-0 bg-[var(--syntax-bg)]">
            <EditorTabs />

            <div
              ref={scrollerRef}
              className="flex-1 overflow-y-auto"
            >
              {openTabs.map((id) => {
                const Section = sectionMap[id];
                return Section ? <Section key={id} /> : null;
              })}
              <div className="h-24" />
            </div>

            <Terminal />
          </main>
        </div>

        <StatusBar />
        <CommandPalette />
      </div>
    </>
  );
};

export default HomePage;
import React from 'react';
import CodeView from '@/components/editor/CodeView.jsx';
import { K, S, N, P, B, Quote, Indent } from '@/components/editor/tokens.jsx';
import { cv, FILES } from '@/data/cv.js';

const file = FILES.find((f) => f.id === 'experience');

const Key = ({ children }) => (
  <>
    <Quote>{children}</Quote>
    <P>: </P>
  </>
);

export default function ExperienceJson() {
  const items = cv.experience;

  const lines = [];
  lines.push(<P>[</P>);

  items.forEach((job, jobIdx) => {
    lines.push(
      <>
        <Indent /> <P>{'{'}</P>
      </>,
    );
    lines.push(
      <>
        <Indent n={2} />
        <Key>title</Key>
        <Quote>{job.title}</Quote>
        <P>,</P>
      </>,
    );
    lines.push(
      <>
        <Indent n={2} />
        <Key>company</Key>
        <Quote>{job.company}</Quote>
        <P>,</P>
      </>,
    );
    if (job.companyUrl) {
      lines.push(
        <>
          <Indent n={2} />
          <Key>url</Key>
          <Quote>{job.companyUrl}</Quote>
          <P>,</P>
        </>,
      );
    }
    lines.push(
      <>
        <Indent n={2} />
        <Key>period</Key>
        <Quote>{job.period}</Quote>
        <P>,</P>
      </>,
    );
    lines.push(
      <>
        <Indent n={2} />
        <Key>location</Key>
        <Quote>{job.location}</Quote>
        <P>,</P>
      </>,
    );
    lines.push(
      <>
        <Indent n={2} />
        <Key>type</Key>
        <Quote>{job.type}</Quote>
        <P>,</P>
      </>,
    );
    lines.push(
      <>
        <Indent n={2} />
        <Key>stack</Key>
        <P>[</P>
        {job.stack.map((s, i) => (
          <React.Fragment key={i}>
            <Quote>{s}</Quote>
            {i < job.stack.length - 1 && <P>, </P>}
          </React.Fragment>
        ))}
        <P>]</P>
        <P>,</P>
      </>,
    );
    lines.push(
      <>
        <Indent n={2} />
        <Key>highlights</Key>
        <P>[</P>
      </>,
    );
    job.highlights.forEach((h, i) => {
      lines.push(
        <>
          <Indent n={3} />
          <Quote>{h}</Quote>
          {i < job.highlights.length - 1 && <P>,</P>}
        </>,
      );
    });
    lines.push(
      <>
        <Indent n={2} />
        <P>]</P>
      </>,
    );
    lines.push(
      <>
        <Indent />
        <P>{'}'}</P>
        {jobIdx < items.length - 1 && <P>,</P>}
      </>,
    );
  });

  lines.push(<P>]</P>);

  return (
    <CodeView id="experience" file={file} footer={`${items.length} positions · valid JSON · last edit ${cv.meta.lastUpdated}`}>
      {lines.map((node, i) => (
        <React.Fragment key={i}>{node}</React.Fragment>
      ))}
    </CodeView>
  );
}
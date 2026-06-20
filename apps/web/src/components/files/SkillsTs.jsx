import React from 'react';
import CodeView from '@/components/editor/CodeView.jsx';
import { K, S, N, P, T, V, F, A, C, Quote, Indent } from '@/components/editor/tokens.jsx';
import { cv, FILES } from '@/data/cv.js';

const file = FILES.find((f) => f.id === 'skills');

export default function SkillsTs() {
  const groups = Object.entries(cv.skills);
  const total = groups.reduce((acc, [, arr]) => acc + arr.length, 0);
  const lines = [];

  lines.push(<C>// {total} tools across {groups.length} categories — pick the right one for the job.</C>);
  lines.push(<></>);
  lines.push(
    <>
      <K>type</K> <T>Skill</T> <P>= </P>
      <P>{'{ '}</P>
      <V>name</V>
      <P>: </P>
      <T>string</T>
      <P>; </P>
      <V>level</V>
      <P>: </P>
      <T>1</T>
      <P>{' | '}</P>
      <T>2</T>
      <P>{' | '}</P>
      <T>3</T>
      <P>{' | '}</P>
      <T>4</T>
      <P>{' | '}</P>
      <T>5</T>
      <P>;</P>
      <P>{' }'}</P>
      <P>;</P>
    </>,
  );
  lines.push(<></>);
  lines.push(
    <>
      <K>export const</K> <V>skills</V> <P>= </P>
      <P>{'{'}</P>
    </>,
  );

  groups.forEach(([category, items], gi) => {
    lines.push(
      <>
        <Indent />
        <V>{category}</V>
        <P>: </P>
        <P>[</P>
      </>,
    );
    items.forEach((s, i) => {
      lines.push(
        <>
          <Indent n={2} />
          <Quote>{s}</Quote>
          {i < items.length - 1 && <P>,</P>}
        </>,
      );
    });
    lines.push(
      <>
        <Indent />
        <P>]</P>
        {gi < groups.length - 1 ? <P>,</P> : null}
      </>,
    );
  });

  lines.push(
    <>
      <P>{'}'}</P>
      <P>{' '}</P>
      <K>as const</K>
      <P>;</P>
    </>,
  );
  lines.push(<></>);
  lines.push(<C>// Always learning. Currently going deep on Bun, Effect-TS, and pgvector.</C>);

  return (
    <CodeView id="skills" file={file} footer={`${total} skills · TypeScript 5.4 · strict mode on`}>
      {lines.map((node, i) => (
        <React.Fragment key={i}>{node}</React.Fragment>
      ))}
    </CodeView>
  );
}
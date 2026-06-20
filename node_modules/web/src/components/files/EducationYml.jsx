import React from 'react';
import CodeView from '@/components/editor/CodeView.jsx';
import { S, N, P, A, C, Indent } from '@/components/editor/tokens.jsx';
import { cv, FILES } from '@/data/cv.js';

const file = FILES.find((f) => f.id === 'education');

const Field = ({ name, value, isNumber, indent = 1 }) => (
  <>
    <Indent n={indent} />
    <A>{name}</A>
    <P>: </P>
    {isNumber ? <N>{value}</N> : <S>{value}</S>}
  </>
);

export default function EducationYml() {
  const { education, certifications } = cv;
  const lines = [];

  lines.push(<C># Formal education</C>);
  lines.push(<></>);
  lines.push(
    <>
      <A>education</A>
      <P>:</P>
    </>,
  );
  education.forEach((edu) => {
    lines.push(
      <>
        <Indent />
        <P>- </P>
        <A>degree</A>
        <P>: </P>
        <S>{edu.degree}</S>
      </>,
    );
    lines.push(<Field name="university" value={edu.university} indent={2} />);
    lines.push(<Field name="year" value={edu.year} isNumber indent={2} />);
    lines.push(<Field name="field" value={edu.field} indent={2} />);
    lines.push(<Field name="thesis" value={edu.thesis} indent={2} />);
    lines.push(<Field name="gpa" value={edu.gpa} indent={2} />);
    lines.push(<></>);
  });

  lines.push(<C># Certifications</C>);
  lines.push(<></>);
  lines.push(
    <>
      <A>certifications</A>
      <P>:</P>
    </>,
  );
  certifications.forEach((cert) => {
    lines.push(
      <>
        <Indent />
        <P>- </P>
        <A>name</A>
        <P>: </P>
        <S>{cert.name}</S>
      </>,
    );
    lines.push(<Field name="year" value={cert.year} isNumber indent={2} />);
  });

  return (
    <CodeView id="education" file={file} footer={`${education.length} degrees · ${certifications.length} certs · YAML 1.2`}>
      {lines.map((node, i) => (
        <React.Fragment key={i}>{node}</React.Fragment>
      ))}
    </CodeView>
  );
}
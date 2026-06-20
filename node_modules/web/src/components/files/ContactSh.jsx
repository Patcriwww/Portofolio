import React from 'react';
import CodeView from '@/components/editor/CodeView.jsx';
import { K, S, N, P, V, F, A, C, Quote, MdLink } from '@/components/editor/tokens.jsx';
import { cv, FILES } from '@/data/cv.js';

const file = FILES.find((f) => f.id === 'contact');

export default function ContactSh() {
  const { contact, social, identity } = cv;

  const lines = [];
  lines.push(<C>#!/usr/bin/env bash</C>);
  lines.push(<C># Pick the channel that fits — I read everything within 24h.</C>);
  lines.push(<></>);
  lines.push(
    <>
      <V>EMAIL</V>
      <P>=</P>
      <Quote>{contact.email}</Quote>
    </>,
  );
  lines.push(
    <>
      <V>PHONE</V>
      <P>=</P>
      <Quote>{contact.phone}</Quote>
    </>,
  );
  lines.push(
    <>
      <V>CALENDAR</V>
      <P>=</P>
      <Quote>{contact.calendar}</Quote>
    </>,
  );
  lines.push(
    <>
      <V>LOCATION</V>
      <P>=</P>
      <Quote>{contact.location}</Quote>
    </>,
  );
  lines.push(<></>);
  lines.push(<C># Direct lines</C>);
  lines.push(
    <>
      <F>open</F> <S>"mailto:</S>
      <MdLink href={`mailto:${contact.email}`}>{contact.email}</MdLink>
      <S>"</S>
    </>,
  );
  lines.push(
    <>
      <F>open</F> <S>"</S>
      <MdLink href={contact.calendar}>{contact.calendar}</MdLink>
      <S>"</S> <C># 20-min intro call</C>
    </>,
  );
  lines.push(<></>);
  lines.push(<C># Find me online</C>);
  social.forEach((s) => {
    lines.push(
      <>
        <F>open</F> <S>"</S>
        <MdLink href={s.url}>{s.url.replace(/^https?:\/\//, '')}</MdLink>
        <S>"</S> <C># {s.label}</C>
      </>,
    );
  });
  lines.push(<></>);
  lines.push(
    <>
      <F>echo</F><Quote>CCurrently open to: internship and junior-level opportunities in software development and networking.</Quote>
    </>,
  );
  lines.push(
    <>
      <F>echo</F> <Quote>Based in {contact.location}. Available for travel.</Quote>
    </>,
  );
  lines.push(<></>);
  lines.push(
    <>
      <K>exit</K> <N>0</N>
    </>,
  );

  return (
    <CodeView id="contact" file={file} footer={`bash · ${social.length} social channels · ${identity.timezone}`}>
      {lines.map((node, i) => (
        <React.Fragment key={i}>{node}</React.Fragment>
      ))}
    </CodeView>
  );
}
import React from 'react';
import CodeView from '@/components/editor/CodeView.jsx';
import { K, S, N, P, T, V, F, A, C, Tag, Quote, Indent, MdLink } from '@/components/editor/tokens.jsx';
import { cv, FILES } from '@/data/cv.js';

const file = FILES.find((f) => f.id === 'projects');

export default function ProjectsTsx() {
  const items = cv.projects;
  const lines = [];

  lines.push(
    <>
      <K>import</K> <P>{'{ '}</P>
      <V>Card</V>
      <P>{', '}</P>
      <V>Stack</V>
      <P>{', '}</P>
      <V>Badge</V>
      <P>{' }'}</P> <K>from</K> <Quote>./ui</Quote>
      <P>;</P>
    </>,
  );
  lines.push(<></>);
  lines.push(
    <>
      <K>type</K> <T>Project</T> <P>= </P>
      <P>{'{'}</P>
    </>,
  );
  lines.push(
    <>
      <Indent />
      <V>name</V>
      <P>: </P>
      <T>string</T>
      <P>; </P>
      <V>tagline</V>
      <P>: </P>
      <T>string</T>
      <P>; </P>
      <V>year</V>
      <P>: </P>
      <T>number</T>
      <P>;</P>
    </>,
  );
  lines.push(
    <>
      <Indent />
      <V>stack</V>
      <P>: </P>
      <T>string</T>
      <P>[]; </P>
      <V>status</V>
      <P>: </P>
      <Quote>live</Quote>
      <P>{' | '}</P>
      <Quote>maintained</Quote>
      <P>{' | '}</P>
      <Quote>archived</Quote>
      <P>; </P>
      <V>repo</V>
      <P>: </P>
      <T>string</T>
      <P>;</P>
    </>,
  );
  lines.push(
    <>
      <P>{'};'}</P>
    </>,
  );
  lines.push(<></>);
  lines.push(
    <>
      <K>const</K> <V>projects</V>
      <P>: </P>
      <T>Project</T>
      <P>[] = [</P>
    </>,
  );

  items.forEach((p, idx) => {
    lines.push(
      <>
        <Indent />
        <P>{'{'}</P>
        <V>name</V>
        <P>: </P>
        <Quote>{p.name}</Quote>
        <P>{', '}</P>
        <V>year</V>
        <P>: </P>
        <N>{p.year}</N>
        <P>{', '}</P>
        <V>status</V>
        <P>: </P>
        <Quote>{p.status}</Quote>
        <P>{' },'}</P>
        {' '}
        <C>{'// ' + p.tagline}</C>
      </>,
    );
    if (idx === items.length - 1) {
      // no separator
    }
  });

  lines.push(<P>];</P>);
  lines.push(<></>);
  lines.push(
    <>
      <K>export default function</K> <F>Projects</F>
      <P>{'() {'}</P>
    </>,
  );
  lines.push(
    <>
      <Indent />
      <K>return</K> <P>(</P>
    </>,
  );
  lines.push(
    <>
      <Indent n={2} />
      <P>{'<'}</P>
      <Tag>Stack</Tag> <A>cols</A>
      <P>{'='}</P>
      <P>{'{'}</P>
      <N>2</N>
      <P>{'}'}</P>
      <P>{'>'}</P>
    </>,
  );

  items.forEach((p) => {
    lines.push(
      <>
        <Indent n={3} />
        <P>{'<'}</P>
        <Tag>Card</Tag> <A>title</A>
        <P>=</P>
        <Quote>{p.name}</Quote> <A>href</A>
        <P>=</P>
        <Quote>{p.url}</Quote>
        <P>{'>'}</P>
      </>,
    );
    lines.push(
      <>
        <Indent n={4} />
        <V>{p.description}</V>
      </>,
    );
    lines.push(
      <>
        <Indent n={4} />
        <P>{'<'}</P>
        <Tag>Badge</Tag>
        <P>{'>'}</P>
        <V>{p.stack.join(' · ')}</V>
        <P>{'</'}</P>
        <Tag>Badge</Tag>
        <P>{'>'}</P>
      </>,
    );
    if (p.repo) {
      lines.push(
        <>
          <Indent n={4} />
          <MdLink href={p.repo}>view on GitHub ↗</MdLink>
        </>,
      );
    }
    lines.push(
      <>
        <Indent n={3} />
        <P>{'</'}</P>
        <Tag>Card</Tag>
        <P>{'>'}</P>
      </>,
    );
  });

  lines.push(
    <>
      <Indent n={2} />
      <P>{'</'}</P>
      <Tag>Stack</Tag>
      <P>{'>'}</P>
    </>,
  );
  lines.push(
    <>
      <Indent />
      <P>{');'}</P>
    </>,
  );
  lines.push(<P>{'}'}</P>);

  return (
    <CodeView id="projects" file={file} footer={`${items.length} projects · live in production · open source`}>
      {lines.map((node, i) => (
        <React.Fragment key={i}>{node}</React.Fragment>
      ))}
    </CodeView>
  );
}
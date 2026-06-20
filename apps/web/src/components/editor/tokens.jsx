import React from 'react';

export const K = ({ children }) => <span className="text-[var(--syntax-keyword)]">{children}</span>;
export const S = ({ children }) => <span className="text-[var(--syntax-string)]">{children}</span>;
export const N = ({ children }) => <span className="text-[var(--syntax-number)]">{children}</span>;
export const B = ({ children }) => <span className="text-[var(--syntax-const)]">{children}</span>;
export const F = ({ children }) => <span className="text-[var(--syntax-fn)]">{children}</span>;
export const T = ({ children }) => <span className="text-[var(--syntax-type)]">{children}</span>;
export const V = ({ children }) => <span className="text-[var(--syntax-fg)]">{children}</span>;
export const A = ({ children }) => <span className="text-[var(--syntax-attr)]">{children}</span>;
export const P = ({ children }) => <span className="text-[var(--syntax-punct)]">{children}</span>;
export const C = ({ children }) => <span className="text-[var(--syntax-comment)] italic">{children}</span>;
export const Tag = ({ children }) => <span className="text-[var(--syntax-tag)]">{children}</span>;

export const MdH1 = ({ children }) => (
  <span className="text-[var(--syntax-heading)] font-semibold">{children}</span>
);
export const MdH2 = ({ children }) => (
  <span className="text-[var(--syntax-heading)] font-semibold">{children}</span>
);
export const MdBold = ({ children }) => (
  <span className="text-[var(--syntax-bold)] font-semibold">{children}</span>
);
export const MdItalic = ({ children }) => (
  <span className="text-[var(--syntax-italic)] italic">{children}</span>
);
export const MdLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-[var(--syntax-link)] underline decoration-dotted underline-offset-2 hover:decoration-solid"
  >
    {children}
  </a>
);

export const Line = ({ children }) => <>{children}</>;

export const Indent = ({ n = 1 }) => <span aria-hidden>{' '.repeat(n * 2)}</span>;

export const Quote = ({ children }) => (
  <>
    <span className="text-[var(--syntax-string)]">"</span>
    <span className="text-[var(--syntax-string)]">{children}</span>
    <span className="text-[var(--syntax-string)]">"</span>
  </>
);
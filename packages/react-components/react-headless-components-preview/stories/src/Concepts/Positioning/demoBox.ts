import type * as React from 'react';

export const demoBoxClass =
  'relative w-full max-w-xl min-h-[260px] border border-dashed border-gray-300 rounded-lg bg-gray-50 p-4';

export const demoBoxStyle: React.CSSProperties = {
  contain: 'layout',
};

export const flipDemoSurfaceCss = `
.flip-demo::after {
  content: 'Actual: ' attr(data-placement);
  display: block;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px dashed #d1d5db;
  font-family: monospace;
  font-size: 0.75rem;
  color: #6b7280;
}
`;

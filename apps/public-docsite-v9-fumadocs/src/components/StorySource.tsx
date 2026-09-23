'use client';

import * as React from 'react';
import { CodeXml } from 'lucide-react';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

import { highlightCode } from './highlighter';
import { DocsButton } from './DocsControls';

export interface StorySourceProps {
  story: { parameters?: { fullSource?: string } };
  defaultOpen?: boolean;
}

export const StorySource = ({ story, defaultOpen = false }: StorySourceProps): React.ReactElement | null => {
  const [open, setOpen] = React.useState(defaultOpen);
  const source = story.parameters?.fullSource;

  const html = React.useMemo(() => (source ? highlightCode(source) : ''), [source]);
  const toggleOpen = React.useCallback(() => setOpen(value => !value), []);

  if (!source) {
    return null;
  }

  return (
    <>
      <DocsButton
        onClick={toggleOpen}
        aria-expanded={open}
        iconPosition="after"
        icon={{
          className: 'inline-flex shrink-0',
          children: <CodeXml aria-hidden="true" className="size-lg" />,
        }}
      >
        {open ? 'Hide code' : 'Show code'}
      </DocsButton>
      {open ? (
        <CodeBlock
          className="order-2 min-w-0 basis-full bg-surface"
          viewportProps={{ 'aria-label': 'Example source code' }}
        >
          {/* Shiki escapes the build-injected story source before producing this HTML. */}
          <Pre dangerouslySetInnerHTML={{ __html: html }} />
        </CodeBlock>
      ) : null}
    </>
  );
};

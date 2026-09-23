'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Check, ChevronDown, FileText } from 'lucide-react';
import { clsx } from 'clsx';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItemLink,
} from '@fluentui/react-headless-components-preview/menu';
import { useLocation } from 'react-router';
import { docsBasename } from '../utils/paths';

import { DocsButton } from './DocsControls';

const actionIcon =
  'inline-flex items-center justify-center size-lg shrink-0 leading-none [&>svg]:block [&>svg]:size-full';

export const MarkdownActions: ForwardRefComponent<React.ComponentProps<'div'>> = React.forwardRef((props, ref) => {
  const { pathname } = useLocation();
  const markdownUrl = `${docsBasename}${pathname.replace(/\/$/, '')}.txt`;
  const [status, setStatus] = React.useState<'idle' | 'copying' | 'copied' | 'error'>('idle');
  const resetTimer = React.useRef<ReturnType<typeof globalThis.setTimeout> | undefined>(undefined);

  React.useEffect(() => () => globalThis.clearTimeout(resetTimer.current), []);

  const copyMarkdown = React.useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      const targetWindow = event.currentTarget.ownerDocument.defaultView;
      const clipboard = targetWindow?.navigator.clipboard;
      globalThis.clearTimeout(resetTimer.current);
      setStatus('copying');

      try {
        if (!targetWindow || !clipboard) {
          throw new Error('Clipboard is unavailable');
        }

        const response = await targetWindow.fetch(markdownUrl);

        if (!response.ok || response.headers.get('content-type')?.includes('text/html')) {
          throw new Error('Markdown could not be loaded');
        }

        await clipboard.writeText(await response.text());
        setStatus('copied');
        resetTimer.current = globalThis.setTimeout(() => setStatus('idle'), 2000);
      } catch {
        setStatus('error');
      }
    },
    [markdownUrl],
  );

  return (
    <div {...props} ref={ref} className={clsx('flex flex-col items-start gap-sm min-w-0', props.className)}>
      <div
        className="inline-flex items-stretch max-w-full [&>:focus-visible]:relative [&>:focus-visible]:z-10"
        role="group"
        aria-label="Page Markdown"
      >
        <DocsButton
          onClick={copyMarkdown}
          disabled={status === 'copying'}
          className="rounded-e-none"
          aria-label="Copy page content as Markdown to clipboard"
          icon={{
            className: actionIcon,
            children: status === 'copied' ? <Check aria-hidden="true" /> : <FileText aria-hidden="true" />,
          }}
        >
          <span className="grid [&>span]:[grid-area:1/1] [&>span]:whitespace-nowrap [&>[aria-hidden=true]]:invisible">
            {['Copy Page', 'Copying…', 'Copied'].map(label => (
              <span
                key={label}
                aria-hidden={
                  label !== (status === 'copied' ? 'Copied' : status === 'copying' ? 'Copying…' : 'Copy Page')
                }
              >
                {label}
              </span>
            ))}
          </span>
        </DocsButton>
        <Menu positioning="below-end">
          <MenuTrigger disableButtonEnhancement>
            <DocsButton
              aria-label="Markdown actions"
              className="rounded-s-none border-s-0 shrink-0 no-underline w-control px-0!"
              icon={{ className: actionIcon, children: <ChevronDown aria-hidden="true" /> }}
            />
          </MenuTrigger>
          <MenuPopover className="p-xs border-thin border-solid border-stroke rounded-control bg-surface text-foreground text-control shadow-popover">
            <MenuList>
              <MenuItemLink
                href={markdownUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="View as Markdown (opens in a new tab)"
                className="flex items-center gap-sm py-xs px-md min-h-control rounded-control text-inherit no-underline cursor-pointer hover:bg-foreground hover:text-surface focus:bg-foreground focus:text-surface"
                icon={{ className: actionIcon, children: <FileText aria-hidden="true" /> }}
              >
                View as Markdown
              </MenuItemLink>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
      <span role="status" aria-live="polite" className={clsx(status === 'error' ? 'text-fd-destructive' : 'sr-only')}>
        {status === 'copied'
          ? 'Copied page as Markdown'
          : status === 'error'
          ? 'Could not copy. Choose View as Markdown from the menu to copy it manually.'
          : ''}
      </span>
    </div>
  );
});

MarkdownActions.displayName = 'MarkdownActions';

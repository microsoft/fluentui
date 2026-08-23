import { useMemo, useState } from 'react';
import { createHighlighterCoreSync } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import tsx from 'shiki/langs/tsx.mjs';
import githubDark from 'shiki/themes/github-dark.mjs';
import githubLight from 'shiki/themes/github-light.mjs';

/**
 * Synchronous highlighter with a fine-grained bundle: it runs identically during
 * prerendering (Node) and after hydration, so the markup does not shift.
 */
const highlighter = createHighlighterCoreSync({
  themes: [githubLight, githubDark],
  langs: [tsx],
  engine: createJavaScriptRegexEngine(),
});

export interface StorySourceProps {
  /** Story export carrying the build-injected standalone source. */
  story: { parameters?: { fullSource?: string } };
  /** Whether the panel starts expanded. */
  defaultOpen?: boolean;
}

/**
 * Reveals the standalone source the build injected onto the story (design D2), with
 * syntax highlighting and copy-to-clipboard.
 */
export function StorySource({ story, defaultOpen = false }: StorySourceProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);

  const source = story.parameters?.fullSource;

  /*
   * Both themes are emitted as CSS custom properties on each token rather than one set of
   * colours, so the panel follows the site theme. Highlighting for light alone left dark text
   * on a dark page, which is unreadable.
   */
  const html = useMemo(
    () =>
      source
        ? highlighter.codeToHtml(source, {
            lang: 'tsx',
            themes: { light: 'github-light', dark: 'github-dark' },
          })
        : '',
    [source],
  );

  if (!source) {
    return null;
  }

  const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const { navigator } = event.currentTarget.ownerDocument.defaultView ?? {};

    if (!navigator?.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(source);
    setCopied(true);
    globalThis.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen(value => !value)}
          aria-expanded={open}
          className="rounded-md border px-3 py-1.5 text-sm"
        >
          {open ? 'Hide code' : 'Show code'}
        </button>
        {open ? (
          <button type="button" onClick={handleCopy} className="rounded-md border px-3 py-1.5 text-sm">
            {copied ? 'Copied' : 'Copy'}
          </button>
        ) : null}
      </div>
      {open ? (
        <div
          tabIndex={0}
          role="region"
          aria-label="Example source code"
          className="mt-2 overflow-x-auto rounded-lg border p-4 text-sm"
          // Shiki output is generated from the build-injected source, not user input.
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : null}
    </div>
  );
}

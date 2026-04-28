/**
 * `HeadlessSourcePanel` — a docs block that renders the "Show code" panel for a
 * headless story with **tabs**: one for the story TSX, one per CSS Module
 * referenced by the story's meta. Replaces Storybook's built-in single-blob
 * Source block (which can't show two languages side-by-side).
 *
 * The tabbed panel is driven by Storybook's native "Show code" toggle that
 * Canvas renders inside its footer (alongside the "Open in Stackblitz" button
 * injected by `@fluentui/react-storybook-addon-export-to-sandbox`). We listen
 * to that toggle's clicks via a click handler on its DOM node and mirror its
 * open/closed state into local React state — keeping the UX of two buttons
 * sitting together in the canvas footer (matching the deployed Fluent docs)
 * while still showing the multi-language tabbed panel below the canvas card.
 *
 * Wired up by `HeadlessDocsPage`. The story's TSX comes from
 * `parameters.docs.source.originalSource` (set via `withStorySource`); the CSS
 * comes from `parameters.theme.cssModules` (set via `withCssModuleSource`).
 */
/* eslint-disable @nx/workspace-no-restricted-globals -- Storybook docs block running in the manager iframe; uses DOM APIs to bridge to the native Canvas toggle that lives outside React. */
import * as React from 'react';
import { createPortal } from 'react-dom';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = Record<string, any>;

// Storybook's docs blocks live behind a deep import. The `useSourceProps` hook
// resolves the Source block's effective `code`/`language` for a story (honoring
// `parameters.docs.source.transform`, `originalSource`, etc).
import { DocsContext, SourceContext, useOf, useSourceProps } from '@storybook/addon-docs/blocks';
// `SyntaxHighlighter` is part of Storybook's internal UI kit and already
// matches the rest of the docs chrome — reusing it keeps the panel visually
// consistent with everything else Storybook renders.
import { SyntaxHighlighter } from 'storybook/internal/components';

/** A CSS Module file surfaced as a tab in the code panel. */
export interface CssModule {
  /** Display name shown on the tab (e.g. `button.module.css`). */
  name: string;
  /** Raw CSS source for the module (typically imported via `?raw`). */
  source: string;
}

export interface HeadlessSourceParameters {
  /** Extra CSS Module sources to surface as tabs after the story TSX tab. */
  cssModules?: CssModule[];
}

interface HeadlessSourcePanelProps {
  /** Reference to the story being rendered (`story.moduleExport`). */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  of: any;
}

const SURFACE_BG = '#ffffff';
const SURFACE_BORDER = 'rgba(38, 85, 115, 0.15)';
const TAB_BAR_BG = '#f6f9fc';
const ACTIVE_TAB_FG = '#9b1f5a';
const TAB_FG = '#666666';

const containerStyle: React.CSSProperties = {
  // Blend into the canvas card: no own border/radius, just a top divider and
  // breathing room below the action bar (Show code / Open in Stackblitz).
  marginTop: 16,
  borderTop: `1px solid ${SURFACE_BORDER}`,
  background: SURFACE_BG,
};

const tabBarStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'stretch',
  background: TAB_BAR_BG,
  borderBottom: `1px solid ${SURFACE_BORDER}`,
};

const tabButtonStyle = (active: boolean): React.CSSProperties => ({
  appearance: 'none',
  border: 0,
  background: 'transparent',
  padding: '10px 14px',
  font: 'inherit',
  fontSize: 12,
  fontWeight: active ? 700 : 500,
  color: active ? ACTIVE_TAB_FG : TAB_FG,
  cursor: 'pointer',
  borderBottom: `2px solid ${active ? ACTIVE_TAB_FG : 'transparent'}`,
  marginBottom: -1,
  whiteSpace: 'nowrap',
});

/**
 * Subscribe to the native "Show code" toggle that Canvas renders inside the
 * `.docs-story` element for `storyId`. Returns the current open/closed state.
 * The selectors mirror those used by `react-storybook-addon-export-to-sandbox`
 * to find the same button (supports both Storybook < 10 and >= 10 anchor IDs).
 */
function useNativeToggleState(storyId: string): boolean {
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    const selector = [
      `#anchor--${storyId} .docs-story .docblock-code-toggle:not(.with-code-sandbox-button)`,
      `#anchor--primary--${storyId} .docs-story .docblock-code-toggle:not(.with-code-sandbox-button)`,
    ].join(', ');

    let cleanups: Array<() => void> = [];
    let cancelled = false;

    const attach = () => {
      if (cancelled) {
        return true;
      }
      const button = document.querySelector<HTMLButtonElement>(selector);
      if (!button) {
        return false;
      }
      const onClick = () => {
        // Native toggle has no aria-expanded — flip our mirror on every click.
        setExpanded(prev => !prev);
      };
      button.addEventListener('click', onClick);
      cleanups.push(() => button.removeEventListener('click', onClick));
      return true;
    };

    if (!attach()) {
      // Canvas mounts asynchronously; poll briefly for the toggle to appear.
      const interval = window.setInterval(() => {
        if (attach()) {
          window.clearInterval(interval);
        }
      }, 100);
      cleanups.push(() => window.clearInterval(interval));
    }

    return () => {
      cancelled = true;
      cleanups.forEach(fn => fn());
      cleanups = [];
    };
  }, [storyId]);

  return expanded;
}

/**
 * Find the canvas card (`.sbdocs-preview`) for `storyId` and append (once) a
 * portal target div as its last child. Returns the element when ready so
 * `HeadlessSourcePanel` can render its tabbed panel **inside** the same bordered card
 * as the story preview, rather than as a detached block below it.
 */
function useCanvasPortalTarget(storyId: string): HTMLElement | null {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const anchorSelector = [`#anchor--${storyId}`, `#anchor--primary--${storyId}`].join(', ');
    let cancelled = false;
    let interval: number | undefined;
    let portalEl: HTMLDivElement | null = null;

    const attach = () => {
      if (cancelled) {
        return true;
      }
      const anchor = document.querySelector<HTMLElement>(anchorSelector);
      const card = anchor?.querySelector<HTMLElement>('.sbdocs-preview');
      if (!card) {
        return false;
      }
      // Look for an existing target so multiple mounts of `HeadlessSourcePanel` (in
      // dev / fast-refresh) reuse the same node.
      let existing = card.querySelector<HTMLDivElement>(':scope > .headless-source-portal');
      if (!existing) {
        existing = document.createElement('div');
        existing.className = 'headless-source-portal';
        // Storybook's `.sbdocs-preview > div` global rules paint a near-black
        // background and drop shadow on direct children — explicitly reset
        // both so the canvas card colour shows through behind our inset,
        // rounded panel.
        existing.style.background = 'transparent';
        existing.style.boxShadow = 'none';
        card.appendChild(existing);
      }
      portalEl = existing;
      setTarget(existing);
      return true;
    };

    if (!attach()) {
      interval = window.setInterval(() => {
        if (attach()) {
          window.clearInterval(interval!);
          interval = undefined;
        }
      }, 100);
    }

    return () => {
      cancelled = true;
      if (interval !== undefined) {
        window.clearInterval(interval);
      }
      if (portalEl && portalEl.parentElement) {
        portalEl.parentElement.removeChild(portalEl);
      }
    };
  }, [storyId]);

  return target;
}

export const HeadlessSourcePanel: React.FC<HeadlessSourcePanelProps> = ({ of }) => {
  const { story } = useOf(of || 'story', ['story']) as { story: AnyProps };
  const docsContext = React.useContext(DocsContext);
  const sourceContext = React.useContext(SourceContext);
  // `useSourceProps` returns the code that Storybook's built-in Source block
  // would have rendered. Pulling from it (rather than reading raw `?raw`
  // imports ourselves) keeps `withStorySource` / `originalSource` semantics
  // intact and follows whatever transform a story sets.
  const sourceProps = useSourceProps({ of }, docsContext, sourceContext) as AnyProps;
  const expanded = useNativeToggleState(story.id);
  const portalTarget = useCanvasPortalTarget(story.id);
  const [activeTabId, setActiveTabId] = React.useState<string>('story-tsx');

  const tsxCode: string = typeof sourceProps.code === 'string' ? sourceProps.code : '';
  const tsxLanguage: string = typeof sourceProps.language === 'string' ? sourceProps.language : 'tsx';
  const allCssModules: CssModule[] =
    (story.parameters?.theme as HeadlessSourceParameters | undefined)?.cssModules ?? [];

  // The meta typically registers every CSS module a component touches across
  // all stories so the Stackblitz sandbox can bundle them. For the per-story
  // tab strip we only want the modules actually referenced in the displayed
  // TSX — match by basename in import strings (e.g. `./styles/dialog.module.css`
  // after `cleanStorySource`, or `./dialog.module.css?raw`).
  const referencedBasenames = new Set(Array.from(tsxCode.matchAll(/([a-z][a-z0-9-]*\.module\.css)/gi), m => m[1]));
  const cssModules = referencedBasenames.size
    ? allCssModules.filter(m => referencedBasenames.has(m.name))
    : allCssModules;

  if (!expanded || !portalTarget) {
    return null;
  }
  if (!tsxCode && cssModules.length === 0) {
    return null;
  }

  type Tab = { id: string; label: string; code: string; language: string };
  const tabs: Tab[] = [
    { id: 'story-tsx', label: 'Story.tsx', code: tsxCode, language: tsxLanguage },
    ...cssModules.map((m, i) => ({ id: `css-${i}`, label: m.name, code: m.source.trim(), language: 'css' })),
  ];
  const activeTab = tabs.find(t => t.id === activeTabId) ?? tabs[0];

  return createPortal(
    <div className="sb-unstyled" style={containerStyle}>
      {tabs.length > 1 && (
        <div style={tabBarStyle} role="tablist" aria-label="Source code">
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tab.id === activeTab.id}
              style={tabButtonStyle(tab.id === activeTab.id)}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
      <div role="tabpanel">
        <SyntaxHighlighter
          // `key` forces a fresh mount per tab so the highlighter resets its
          // scroll position and copy button state between languages.
          key={activeTab.id}
          language={activeTab.language}
          copyable
          bordered={false}
          padded
          format={false}
          showLineNumbers={false}
        >
          {activeTab.code}
        </SyntaxHighlighter>
      </div>
    </div>,
    portalTarget,
  );
};

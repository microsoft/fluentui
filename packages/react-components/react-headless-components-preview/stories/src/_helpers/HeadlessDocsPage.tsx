/**
 * `HeadlessDocsPage` — replaces Storybook's autodocs page so we can render a
 * **tabbed** "Show code" panel under each story (TSX + each CSS Module the
 * story uses). The deployed Fluent docs page (`FluentDocsPage`) hard-wires
 * `<Primary>` / `<Stories>` blocks whose Source can't be made multi-language,
 * so we re-implement the same layout (Title / Subtitle / Description /
 * primary canvas + source / ArgTypes / Stories heading / each story canvas +
 * source) and swap the source block for our own `<HeadlessSourcePanel>`. The order
 * mirrors `packages/react-components/react-storybook-addon/src/docs/FluentDocsPage.tsx`
 * so the page matches what's deployed at storybooks.fluentui.dev/headless.
 *
 * Wired in by `.storybook/preview.js` via `parameters.docs.page`.
 */
import * as React from 'react';

import {
  Anchor,
  ArgTypes,
  Canvas,
  Description,
  DocsContext,
  HeaderMdx,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';

import { HeadlessSourcePanel } from './HeadlessSourcePanel';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyStory = Record<string, any>;

const dividerStyle: React.CSSProperties = {
  height: 1,
  backgroundColor: '#e1dfdd',
  border: 0,
  margin: '48px 0',
};

const storiesHeadingStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  lineHeight: '16px',
  letterSpacing: '0.35em',
  textTransform: 'uppercase',
  color: '#666666',
  border: 0,
  margin: '56px 0 12px',
};

const nameToHash = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const disclaimerStyle: React.CSSProperties = {
  margin: '20px 0 0',
  padding: '16px 20px',
  border: '1px solid #e1dfdd',
  borderLeft: '4px solid #9b1f5a',
  borderRadius: 6,
  background: '#fdf6f9',
  color: '#3c3c3c',
  fontSize: 16,
  lineHeight: 1.55,
};

const disclaimerNoteStyle: React.CSSProperties = {
  marginTop: 10,
  paddingTop: 10,
  borderTop: '1px dashed #e1c2d2',
  fontSize: 14,
  color: '#5a5a5a',
};

export const HeadlessDocsPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const docsContext = React.useContext(DocsContext) as any;
  let stories: AnyStory[] = docsContext.componentStories();

  // Mirrors the filtering rules from Storybook's built-in `<Stories>` block:
  // honor a project-level `parameters.docs.stories.filter`, and when any
  // story is `autodocs`-tagged, restrict to those (skipping `usesMount`
  // stories which can't render inline).
  const filter = docsContext.projectAnnotations?.parameters?.docs?.stories?.filter as
    | ((s: AnyStory, ctx: AnyStory) => boolean)
    | undefined;
  if (filter) {
    stories = stories.filter(story => filter(story, docsContext.getStoryContext(story)));
  }
  if (stories.some(story => story.tags?.includes('autodocs'))) {
    stories = stories.filter(story => story.tags?.includes('autodocs') && !story.usesMount);
  }

  const primaryStory = stories[0];
  const remainingStories = stories.slice(1);

  return (
    <div className="sb-unstyled headless-docs-page">
      {/*
        The `@fluentui/react-storybook-addon-export-to-sandbox` decorator looks
        for `.docblock-code-toggle` inside `.docs-story` of each story to anchor
        its "Open in Stackblitz" button. We keep Canvas's default sourceState
        ('hidden') so the native "Show code" toggle is rendered there too —
        the Stackblitz button sits next to it inside the canvas footer (see
        `HeadlessSourcePanel` for how its clicks drive our tabbed panel).
      */}
      <style>{headlessDocsPageCss}</style>
      <Title />
      <Subtitle />
      <Description />
      <aside style={disclaimerStyle} role="note">
        <div>
          <strong>Heads up:</strong> headless components ship without default styles. The CSS shown in these stories is
          provided purely as a demonstration of one possible look.
        </div>
        <div style={disclaimerNoteStyle}>
          <strong>Preview:</strong> these controls are in preview and their APIs are subject to change.
        </div>
      </aside>

      {primaryStory && (
        <>
          <hr style={dividerStyle} />
          <HeaderMdx as="h3" id={nameToHash(primaryStory.name)}>
            {primaryStory.name}
          </HeaderMdx>
          <Anchor storyId={primaryStory.id}>
            <Canvas of={primaryStory.moduleExport} />
            <HeadlessSourcePanel of={primaryStory.moduleExport} />
          </Anchor>
        </>
      )}

      {/* Component-level props table (mirrors what FluentDocsPage renders). */}
      <ArgTypes />

      {remainingStories.length > 0 && (
        <>
          <h2 style={storiesHeadingStyle}>Stories</h2>
          {remainingStories.map(story => (
            <Anchor key={story.id} storyId={story.id}>
              <HeaderMdx as="h3" id={nameToHash(story.name)}>
                {story.name}
              </HeaderMdx>
              <Description of={story.moduleExport} />
              <Canvas of={story.moduleExport} />
              <HeadlessSourcePanel of={story.moduleExport} />
            </Anchor>
          ))}
        </>
      )}
    </div>
  );
};

// We let Storybook's native "Show code" toggle render inside the Canvas
// footer (alongside the "Open in Stackblitz" button injected by
// `@fluentui/react-storybook-addon-export-to-sandbox`). We hide only the
// expanded source pane it would normally reveal — `<HeadlessSourcePanel>` listens to
// the native toggle's clicks and renders our tabbed panel **into the same
// canvas card** via a portal target (`.headless-source-portal`).
//
// Storybook 9 sets a fixed `height` and `overflow: hidden` on `.sbdocs-preview`
// so its border tightly hugs the rendered story; when our panel is expanded
// inside the same card we need to release both so the code panel can flow.
const headlessDocsPageCss = `
.headless-docs-page .sbdocs-preview > *:not(.docs-story):not(.headless-source-portal) {
  display: none !important;
}
.headless-docs-page .sbdocs-preview:has(> .headless-source-portal:not(:empty)) {
  height: auto !important;
}

/*
  Force the magenta accent for the "Show code" / "Open in Stackblitz" hover &
  focus underlines. Storybook's ActionBar paints the underline via an inset
  box-shadow driven by \`theme.color.secondary\`, and the
  \`@fluentui/react-storybook-addon-export-to-sandbox\` styles hard-code a blue
  underline on the Stackblitz button — both are overridden here so the canvas
  action buttons match the rest of the headless docs accent.
*/
.headless-docs-page .sbdocs-preview .docblock-code-toggle:hover,
.headless-docs-page .sbdocs-preview .docblock-code-toggle:focus,
.headless-docs-page .sbdocs-preview .docblock-code-toggle.docblock-code-toggle--expanded,
.headless-docs-page .docs-story .with-code-sandbox-button:hover,
.headless-docs-page .docs-story .with-code-sandbox-button:focus {
  outline: none !important;
  box-shadow: #9b1f5a 0 -3px 0 0 inset !important;
  color: #9b1f5a !important;
}
`;

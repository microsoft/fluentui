/**
 * `BebopDocsPage` — replaces Storybook's autodocs page so we can render a
 * **tabbed** "Show code" panel under each story (TSX + each CSS Module the
 * story uses). The deployed Fluent docs page (`FluentDocsPage`) hard-wires
 * `<Primary>` / `<Stories>` blocks whose Source can't be made multi-language,
 * so we re-implement the same layout (Title / Subtitle / Description /
 * primary canvas + source / ArgTypes / Stories heading / each story canvas +
 * source) and swap the source block for our own `<BebopSource>`. The order
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

import { BebopSource } from './BebopSource';

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

export const BebopDocsPage: React.FC = () => {
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
    <div className="sb-unstyled bebop-docs-page">
      {/*
        The `@fluentui/react-storybook-addon-export-to-sandbox` decorator looks
        for `.docblock-code-toggle` inside `.docs-story` of each story to anchor
        its "Open in Stackblitz" button. We keep Canvas's default sourceState
        ('hidden') so the native "Show code" toggle is rendered there too —
        the Stackblitz button sits next to it inside the canvas footer (see
        `BebopSource` for how its clicks drive our tabbed panel).
      */}
      <style>{bebopDocsPageCss}</style>
      <Title />
      <Subtitle />
      <Description />

      {primaryStory && (
        <>
          <hr style={dividerStyle} />
          <HeaderMdx as="h3" id={nameToHash(primaryStory.name)}>
            {primaryStory.name}
          </HeaderMdx>
          <Anchor storyId={primaryStory.id}>
            <Canvas of={primaryStory.moduleExport} />
            <BebopSource of={primaryStory.moduleExport} />
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
              <BebopSource of={story.moduleExport} />
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
// expanded source pane it would normally reveal — `<BebopSource>` listens to
// the native toggle's clicks and renders our tabbed panel **into the same
// canvas card** via a portal target (`.bebop-source-portal`).
//
// Storybook 9 sets a fixed `height` and `overflow: hidden` on `.sbdocs-preview`
// so its border tightly hugs the rendered story; when our panel is expanded
// inside the same card we need to release both so the code panel can flow.
const bebopDocsPageCss = `
.bebop-docs-page .sbdocs-preview > *:not(.docs-story):not(.bebop-source-portal) {
  display: none !important;
}
.bebop-docs-page .sbdocs-preview:has(> .bebop-source-portal:not(:empty)) {
  height: auto !important;
}
`;

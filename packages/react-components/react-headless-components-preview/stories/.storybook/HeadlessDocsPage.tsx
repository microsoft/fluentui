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
  padding: '18px 22px',
  border: '1px solid #e1dfdd',
  borderLeft: '4px solid #9b1f5a',
  borderRadius: 6,
  background: '#fdf6f9',
  color: '#3c3c3c',
  fontSize: 19,
  lineHeight: 1.55,
};

const disclaimerNoteStyle: React.CSSProperties = {
  marginTop: 12,
  paddingTop: 12,
  borderTop: '1px dashed #e1c2d2',
  fontSize: 19,
  lineHeight: 1.55,
  color: '#3c3c3c',
};

export const HeadlessDocsPage: React.FC = () => {
  const docsContext = React.useContext(DocsContext);
  const stories = docsContext.componentStories();

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

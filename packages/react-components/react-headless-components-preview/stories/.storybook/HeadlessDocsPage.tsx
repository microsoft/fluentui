/**
 * `HeadlessDocsPage` — thin wrapper around `FluentDocsPage` that swaps in
 * headless-specific renderers for the primary story and the secondary
 * stories list. The shared page handles the docs chrome (Title / Subtitle /
 * Description / ArgTypes via the slot enhancer); the renderers here add the
 * "preview" disclaimer, wrap each canvas in `<Anchor>`, and replace
 * Storybook's single-blob Source block with the tabbed `<HeadlessSourcePanel>`
 * (TSX + each CSS Module the story uses).
 */
import * as React from 'react';

import { Anchor, Canvas, Description, HeaderMdx } from '@storybook/addon-docs/blocks';
import { FluentDocsPage, type FluentDocsPageProps } from '@fluentui/react-storybook-addon';

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

const Disclaimer: React.FC = () => (
  <aside style={disclaimerStyle} role="note">
    <div>
      <strong>Heads up:</strong> headless components ship without default styles. The CSS shown in these stories is
      provided purely as a demonstration of one possible look.
    </div>
    <div style={disclaimerNoteStyle}>
      <strong>Preview:</strong> these controls are in preview and their APIs are subject to change.
    </div>
  </aside>
);

/**
 * Prefixes the preview disclaimer, then renders the primary story inside an
 * `<Anchor>` so `HeadlessSourcePanel` can portal its tabbed code panel into
 * the same canvas card as the story.
 *
 * The `@fluentui/react-storybook-addon-export-to-sandbox` decorator looks for
 * `.docblock-code-toggle` inside `.docs-story` — Canvas's default
 * `sourceState: 'hidden'` keeps that toggle in the canvas footer next to the
 * "Open in Stackblitz" button (see `HeadlessSourcePanel` for how the toggle
 * drives the tabbed panel).
 */
const HeadlessRenderPrimaryStory: FluentDocsPageProps['renderPrimaryStory'] = ({ primaryStory, skipPrimaryStory }) => {
  if (skipPrimaryStory) {
    return null;
  }
  return (
    <div>
      <Disclaimer />
      <hr style={dividerStyle} />
      <HeaderMdx as="h3" id={nameToHash(primaryStory.name)}>
        {primaryStory.name}
      </HeaderMdx>
      <Anchor storyId={primaryStory.id}>
        <Canvas of={primaryStory.moduleExport} />
        <HeadlessSourcePanel of={primaryStory.moduleExport} />
      </Anchor>
    </div>
  );
};

const HeadlessRenderStories: FluentDocsPageProps['renderStories'] = ({ stories }) => {
  if (stories.length === 0) {
    return <></>;
  }
  return (
    <>
      <h2 style={storiesHeadingStyle}>Stories</h2>
      {stories.map(story => (
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
  );
};

export const HeadlessDocsPage: React.FC = () => (
  <div className="headless-docs-page">
    <FluentDocsPage renderPrimaryStory={HeadlessRenderPrimaryStory} renderStories={HeadlessRenderStories} />
  </div>
);

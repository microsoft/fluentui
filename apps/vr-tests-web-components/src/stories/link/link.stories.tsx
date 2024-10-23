import * as React from 'react';
import { default as parse } from 'html-react-parser';
import { Steps, StoryWright } from 'storywright';
import { LinkDefinition, FluentDesignSystem } from '@fluentui/web-components';

LinkDefinition.define(FluentDesignSystem.registry);

const linkId = 'link-id';

const steps = new Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .hover(`#${linkId}`)
  .snapshot('hover', { cropTo: '.testWrapper' })
  .mouseDown(`#${linkId}`)
  .snapshot('pressed', { cropTo: '.testWrapper' })
  .end();

export default {
  title: 'Link',
  decorators: [
    (story: () => React.ReactElement) => {
      return (
        <StoryWright steps={steps}>
          <div className="testWrapper" style={{ width: '300px' }}>
            {story()}
          </div>
        </StoryWright>
      );
    },
  ],
};

export const Default = () => parse(`<fluent-link id="${linkId}">Default</fluent-link>`);

export const Subtle = () => parse(`<fluent-link id="${linkId}" appearance="subtle">Primary</fluent-link>`);

export const Inline = () =>
  parse(`<p>This is an <fluent-link id="${linkId}" inline>inline link</fluent-link> used alongside text</p>.`);

export const WithLongText = () =>
  parse(`
    <style>
    .max-width {
      display: block;
      width: 250px;
    }
    </style>
    <p class="max-width">
    This paragraph contains a link which is very long.
    <fluent-link href="#">Fluent links wrap correctly between lines when they are very long.</fluent-link> This is
    because they are inline elements.
    </p>
`);

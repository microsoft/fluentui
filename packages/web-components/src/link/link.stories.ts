import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Link as FluentLink } from './link.js';
import { LinkAppearance } from './link.options.js';

type LinkStoryArgs = Args & FluentLink;
type LinkStoryMeta = Meta<LinkStoryArgs>;

const storyTemplate = html<LinkStoryArgs>`
  <fluent-link href="${x => x.href}" appearance="${x => x.appearance}">${x => x.content}</fluent-link>
`;

export default {
  title: 'Components/Link',
  args: {
    content: 'Link',
    href: '#',
    disabled: false,
    disabledFocusable: false,
  },
  argTypes: {
    appearance: {
      options: Object.values(LinkAppearance),
      control: {
        type: 'select',
      },
    },
    href: {
      control: 'text',
    },
    content: {
      control: 'Anchor text',
    },
  },
} as LinkStoryMeta;

export const Link = renderComponent(storyTemplate).bind({});

export const Appearance = renderComponent(html<LinkStoryArgs>`
  <fluent-link href="#" appearance="subtle">Subtle</fluent-link>
`);

export const Inline = renderComponent(html<LinkStoryArgs>`
  <fluent-text
    ><p>
      This is an <fluent-link href="#" inline>inline link</fluent-link> used alongside text within the
      <code>fluent-text</code> component.
    </p></fluent-text
  >
  <p>This is an <fluent-link href="#" inline>inline link</fluent-link> used alongside a <code>p</code> element.</p>
  <h4>
    This is an <fluent-link href="#">inline link without the inline attribute</fluent-link> within a
    <code>h4</code> element. In Chromium browsers, the link inherits without the use of the
    <code>inline</code> attribute.
  </h4>
`);

export const Wrapping = renderComponent(html<LinkStoryArgs>`
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

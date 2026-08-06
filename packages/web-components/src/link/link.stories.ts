import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { AnchorTarget } from '../anchor-button/anchor-button.options.js';
import { getStorybookHelpers } from '../../.storybook/wc-toolkit-helpers.js';
import type { Link as FluentLink } from './link.js';
import { LinkAppearance } from './link.options.js';

type Story = StoryObj<FluentLink>;
const { argTypes } = getStorybookHelpers<FluentLink>('fluent-link');

const storyTemplate = html<StoryArgs<FluentLink>>`
  <fluent-link
    href="${story => story.href}"
    hreflang="${story => story.hreflang}"
    referrerpolicy="${story => story.referrerpolicy}"
    rel="${story => story.rel}"
    type="${story => story.type}"
    target="${story => story.target}"
    inline="${story => story.inline}"
    appearance="${story => story.appearance}"
  >
    ${story => story.slottedContent?.()}
  </fluent-link>
`;

export default {
  title: 'Components/Link',
  render: renderComponent(storyTemplate),
  args: {
    slottedContent: () => 'Link',
    href: '#',
  },
  argTypes,
} as Meta<FluentLink>;

export const Default = {};

export const Appearance: Story = {
  render: renderComponent(html<StoryArgs<FluentLink>>`
    <fluent-link href="#" appearance="subtle">Subtle</fluent-link>
  `),
};

export const Inline: Story = {
  render: renderComponent(html<StoryArgs<FluentLink>>`
    <style>
      h4,
      p {
        color: var(--colorNeutralForeground1);
      }
    </style>
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
  `),
};

export const Wrapping: Story = {
  render: renderComponent(html<StoryArgs<FluentLink>>`
    <style>
      .max-width {
        display: block;
        width: 250px;
        color: var(--colorNeutralForeground1);
      }
    </style>
    <p class="max-width">
      This paragraph contains a link which is very long.
      <fluent-link href="#">Fluent links wrap correctly between lines when they are very long.</fluent-link> This is
      because they are inline elements.
    </p>
  `),
};

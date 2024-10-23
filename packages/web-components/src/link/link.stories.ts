import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { AnchorTarget } from '../anchor-button/anchor-button.options.js';
import type { Link as FluentLink } from './link.js';
import { LinkAppearance } from './link.options.js';

type Story = StoryObj<FluentLink>;

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
  argTypes: {
    href: {
      control: 'text',
      description: 'The href of the anchor.',
      name: 'href',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    hreflang: {
      control: 'text',
      description: 'Hints at the language of the referenced resource.',
      name: 'hreflang',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    referrerpolicy: {
      control: 'text',
      description: 'The referrerpolicy attribute.',
      name: 'referrerpolicy',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    rel: {
      control: 'text',
      description: 'The rel attribute.',
      name: 'rel',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    type: {
      control: 'text',
      description: 'The type attribute.',
      name: 'type',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    target: {
      control: 'select',
      description: 'The target attribute.',
      mapping: { '': null, ...AnchorTarget },
      options: ['', ...Object.values(AnchorTarget)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(AnchorTarget).join('|') },
      },
    },
    inline: {
      control: 'text',
      description: 'If the link is inline with text.',
      name: 'inline',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    appearance: {
      control: 'select',
      description: 'The appearance of the link.',
      mapping: { '': null, ...LinkAppearance },
      options: ['', ...Object.values(LinkAppearance)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(LinkAppearance).join('|') },
      },
    },
    slottedContent: {
      control: false,
      description: 'The default slot',
      name: '',
      table: { category: 'slots', type: {} },
    },
  },
} as Meta<FluentLink>;

export const Default = {};

export const Appearance: Story = {
  render: renderComponent(html<StoryArgs<FluentLink>>`
    <fluent-link href="#" appearance="subtle">Subtle</fluent-link>
  `),
};

export const Inline: Story = {
  render: renderComponent(html<StoryArgs<FluentLink>>`
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
      }
    </style>
    <p class="max-width">
      This paragraph contains a link which is very long.
      <fluent-link href="#">Fluent links wrap correctly between lines when they are very long.</fluent-link> This is
      because they are inline elements.
    </p>
  `),
};

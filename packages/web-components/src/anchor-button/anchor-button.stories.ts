import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { AnchorButton as FluentAnchorButton } from './anchor-button.js';
import { AnchorButtonAppearance, AnchorButtonShape, AnchorButtonSize, AnchorTarget } from './anchor-button.options.js';

type Story = StoryObj<FluentAnchorButton>;

const storyTemplate = html<StoryArgs<FluentAnchorButton>>`
  <fluent-anchor-button
    href="${story => story.href}"
    hreflang="${story => story.hreflang}"
    referrerpolicy="${story => story.referrerpolicy}"
    rel="${story => story.rel}"
    type="${story => story.type}"
    target="${story => story.target || void 0}"
    appearance="${story => story.appearance}"
    shape="${story => story.shape}"
    size="${story => story.size}"
    ?icon-only="${story => story.iconOnly}"
  >
    ${story => story.startSlottedContent?.()} ${story => story.slottedContent?.()}
    ${story => story.endSlottedContent?.()}
  </fluent-anchor-button>
`;

export default {
  title: 'Components/Button/Anchor',
  render: renderComponent(storyTemplate),
  args: {
    href: '#',
    slottedContent: () => 'Anchor',
  },
  argTypes: {
    appearance: {
      control: 'select',
      description: 'Indicates the styled appearance of the button.',
      options: ['', ...Object.values(AnchorButtonAppearance)],
      mapping: { '': null, ...AnchorButtonAppearance },
      table: {
        category: 'attributes',
        type: { summary: Object.values(AnchorButtonAppearance).join('|') },
      },
    },
    shape: {
      control: 'select',
      description: 'Indicates the shape of the button.',
      options: ['', ...Object.values(AnchorButtonShape)],
      mapping: { '': null, ...AnchorButtonShape },
      table: {
        category: 'attributes',
        type: { summary: Object.values(AnchorButtonShape).join('|') },
      },
    },
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
      options: ['', ...Object.values(AnchorTarget)],
      mapping: { '': null, ...AnchorTarget },
      table: {
        category: 'attributes',
        type: { summary: Object.values(AnchorTarget).join('|') },
      },
    },
    iconOnly: {
      control: 'boolean',
      description: 'Indicates the button should only display as an icon.',
      name: 'icon-only',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    name: {
      control: 'text',
      description:
        "The name of the element. This element's value will be surfaced during form submission under the provided name.",
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    size: {
      control: 'select',
      description: 'The size of the button.',
      options: ['', ...Object.values(AnchorButtonSize)],
      mapping: { '': null, ...AnchorButtonSize },
      table: {
        category: 'attributes',
        type: { summary: Object.values(AnchorButtonSize).join('|') },
      },
    },
    slottedContent: {
      control: false,
      description: 'The default slot',
      name: '',
      table: { category: 'slots', type: {} },
    },
    startSlottedContent: {
      control: false,
      description: 'Slot for start icons',
      name: 'start',
      table: { category: 'slots', type: {} },
    },
    endSlottedContent: {
      control: false,
      description: 'Slot for end icons',
      name: 'end',
      table: { category: 'slots', type: {} },
    },
  },
} as Meta<FluentAnchorButton>;

export const Default: Story = {};

export const Appearance: Story = {
  render: renderComponent(html<StoryArgs<FluentAnchorButton>>`
    <fluent-anchor-button href="#">Default</fluent-anchor-button>
    <fluent-anchor-button href="#" appearance="primary">Primary</fluent-anchor-button>
    <fluent-anchor-button href="#" appearance="outline">Outline</fluent-anchor-button>
    <fluent-anchor-button href="#" appearance="subtle">Subtle</fluent-anchor-button>
    <fluent-anchor-button href="#" appearance="transparent">Transparent</fluent-anchor-button>
  `),
};

export const Shape: Story = {
  render: renderComponent(html<StoryArgs<FluentAnchorButton>>`
    <fluent-anchor-button href="#" shape="rounded">Rounded</fluent-anchor-button>
    <fluent-anchor-button href="#" shape="circular">Circular</fluent-anchor-button>
    <fluent-anchor-button href="#" shape="square">Square</fluent-anchor-button>
  `),
};

export const Size: Story = {
  render: renderComponent(html<StoryArgs<FluentAnchorButton>>`
    <fluent-anchor-button href="#" size="small">Small</fluent-anchor-button>
    <fluent-anchor-button href="#" size="small" icon>
      <svg
        fill="currentColor"
        slot="start"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 3A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9A2.5 2.5 0 015.5 3h9zm0 1h-9C4.67 4 4 4.67 4 5.5v9c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zM7 11a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zM7 7a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z"
          fill="currentColor"
        ></path>
      </svg>
      Small with calendar icon
    </fluent-anchor-button>
    <fluent-anchor-button href="#" size="small" icon-only aria-label="Small icon only button"
      ><svg
        fill="currentColor"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 3A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9A2.5 2.5 0 015.5 3h9zm0 1h-9C4.67 4 4 4.67 4 5.5v9c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zM7 11a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zM7 7a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z"
          fill="currentColor"
        ></path>
      </svg>
    </fluent-anchor-button>
    <fluent-anchor-button href="#" size="medium">Medium</fluent-anchor-button>
    <fluent-anchor-button href="#" size="medium" icon>
      <svg
        fill="currentColor"
        slot="start"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 3A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9A2.5 2.5 0 015.5 3h9zm0 1h-9C4.67 4 4 4.67 4 5.5v9c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zM7 11a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zM7 7a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z"
          fill="currentColor"
        ></path>
      </svg>
      Medium with calendar icon
    </fluent-anchor-button>
    <fluent-anchor-button href="#" size="medium" icon-only aria-label="Medium icon only button"
      ><svg
        fill="currentColor"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 3A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9A2.5 2.5 0 015.5 3h9zm0 1h-9C4.67 4 4 4.67 4 5.5v9c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zM7 11a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zM7 7a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z"
          fill="currentColor"
        ></path>
      </svg>
    </fluent-anchor-button>
    <fluent-anchor-button href="#" size="large">Large</fluent-anchor-button>
    <fluent-anchor-button href="#" size="large" icon
      ><svg
        fill="currentColor"
        slot="start"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 3A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9A2.5 2.5 0 015.5 3h9zm0 1h-9C4.67 4 4 4.67 4 5.5v9c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zM7 11a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zM7 7a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z"
          fill="currentColor"
        ></path>
      </svg>
      Large with calendar icon
    </fluent-anchor-button>
    <fluent-anchor-button href="#" size="large" icon-only aria-label="Large icon only button"
      ><svg
        fill="currentColor"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 3A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9A2.5 2.5 0 015.5 3h9zm0 1h-9C4.67 4 4 4.67 4 5.5v9c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zM7 11a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zM7 7a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z"
          fill="currentColor"
        ></path>
      </svg>
    </fluent-anchor-button>
  `),
};

export const WithLongText: Story = {
  render: renderComponent(html<StoryArgs<FluentAnchorButton>>`
    <style>
      .max-width {
        width: 280px;
      }
    </style>
    <fluent-anchor-button href="#">Short text</fluent-anchor-button>
    <fluent-anchor-button href="#" class="max-width"
      >Long text wraps after it hits the max width of the component</fluent-anchor-button
    >
  `),
};

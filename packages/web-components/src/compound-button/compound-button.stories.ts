import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { CompoundButton as FluentCompoundButton } from './compound-button.js';
import { CompoundButtonAppearance, CompoundButtonShape, CompoundButtonSize } from './compound-button.options.js';

type Story = StoryObj<FluentCompoundButton>;

const storyTemplate = html<StoryArgs<FluentCompoundButton>>`
  <fluent-compound-button
    appearance="${story => story.appearance}"
    shape="${story => story.shape}"
    size="${story => story.size}"
    ?disabled="${story => story.disabled}"
    ?disabled-focusable="${story => story.disabledFocusable}"
    ?icon-only="${story => story.iconOnly}"
  >
    ${story => story.startSlottedContent?.()} ${story => story.slottedContent?.()}
    ${story => story.descriptionSlottedContent?.()} ${story => story.endSlottedContent?.()}
  </fluent-compound-button>
`;

export default {
  title: 'Components/Button/Compound Button',
  render: renderComponent(storyTemplate),
  args: {
    disabled: false,
    disabledFocusable: false,
    slottedContent: () => 'Button',
    descriptionSlottedContent: () => html`<span slot="description">Secondary content</span>`,
  },
  argTypes: {
    appearance: {
      control: 'select',
      description: 'Indicates the styled appearance of the button.',
      options: ['', ...Object.values(CompoundButtonAppearance)],
      mapping: { '': null, ...CompoundButtonAppearance },
      table: {
        category: 'attributes',
        type: { summary: Object.values(CompoundButtonAppearance).join('|') },
      },
    },
    shape: {
      control: 'select',
      description: 'The shape of the button.',
      options: ['', ...Object.values(CompoundButtonShape)],
      mapping: { '': null, ...CompoundButtonShape },
      table: {
        category: 'attributes',
        type: { summary: Object.values(CompoundButtonShape).join('|') },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the button.',
      options: ['', ...Object.values(CompoundButtonSize)],
      mapping: { '': null, ...CompoundButtonSize },
      table: {
        category: 'attributes',
        type: { summary: Object.values(CompoundButtonSize).join('|') },
      },
    },
    disabled: {
      control: 'boolean',
      description: "Sets the button's disabled state.",
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    disabledFocusable: {
      control: 'boolean',
      description: 'Indicates the button is focusable while disabled.',
      name: 'disabled-focusable',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    slottedContent: {
      control: false,
      description: 'The default slot',
      name: '',
      table: { category: 'slots', type: {} },
    },
    descriptionSlottedContent: {
      control: false,
      description: 'The description slot',
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
} as Meta<FluentCompoundButton>;

export const Appearance: Story = {
  render: renderComponent(html<StoryArgs<FluentCompoundButton>>`
    <fluent-compound-button>Default <span slot="description">Description content</span></fluent-compound-button>
    <fluent-compound-button appearance="primary">
      Primary
      <span slot="description">Description content</span>
    </fluent-compound-button>
    <fluent-compound-button appearance="outline">
      Outline
      <span slot="description">Description content</span>
    </fluent-compound-button>
    <fluent-compound-button appearance="subtle">
      Subtle
      <span slot="description">Description content</span>
    </fluent-compound-button>
    <fluent-compound-button appearance="transparent">
      Transparent
      <span slot="description">Description content</span>
    </fluent-compound-button>
  `),
};

export const Shape: Story = {
  render: renderComponent(html<StoryArgs<FluentCompoundButton>>`
    <fluent-compound-button shape="rounded">
      Rounded
      <span slot="description">Description content</span>
    </fluent-compound-button>
    <fluent-compound-button shape="circular">
      Circular
      <span slot="description">Description content</span>
    </fluent-compound-button>
    <fluent-compound-button shape="square">
      Square
      <span slot="description">Description content</span>
    </fluent-compound-button>
  `),
};

export const Size: Story = {
  render: renderComponent(html<StoryArgs<FluentCompoundButton>>`
    <fluent-compound-button size="small"
      >Small<span slot="description">Description content</span></fluent-compound-button
    >
    <fluent-compound-button size="small">
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
      Small with calendar icon<span slot="description">Description content</span>
    </fluent-compound-button>
    <fluent-compound-button size="small" icon-only aria-label="Small icon only button">
      <svg
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
    </fluent-compound-button>
    <fluent-compound-button size="medium">
      Medium
      <span slot="description">Description content</span>
    </fluent-compound-button>
    <fluent-compound-button size="medium">
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
    </fluent-compound-button>
    <fluent-compound-button size="medium" icon-only aria-label="Medium icon only button">
      <svg
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
    </fluent-compound-button>
    <fluent-compound-button size="large">
      Large
      <span slot="description">Description content</span>
    </fluent-compound-button>
    <fluent-compound-button size="large">
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
      Large with calendar icon<span slot="description">Description content</span>
    </fluent-compound-button>
    <fluent-compound-button size="large" icon-only aria-label="Large icon only button">
      <svg
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
    </fluent-compound-button>
  `),
};

export const Disabled: Story = {
  render: renderComponent(html<StoryArgs<FluentCompoundButton>>`
    <fluent-compound-button>Enabled state<span slot="description">Description content</span></fluent-compound-button>
    <fluent-compound-button disabled>
      Disabled state
      <span slot="description">Description content</span>
    </fluent-compound-button>
    <fluent-compound-button disabled-focusable>
      Disabled focusable state
      <span slot="description">Description content</span>
    </fluent-compound-button>
    <fluent-compound-button appearance="primary">
      Enabled state
      <span slot="description">Description content</span>
    </fluent-compound-button>
    <fluent-compound-button appearance="primary" disabled>
      Disabled state
      <span slot="description">Description content</span>
    </fluent-compound-button>
    <fluent-compound-button appearance="primary" disabled-focusable>
      Disabled focusable state
      <span slot="description">Description content</span>
    </fluent-compound-button>
  `),
};

export const WithLongText: Story = {
  render: renderComponent(html<StoryArgs<FluentCompoundButton>>`
    <style>
      .max-width {
        width: 280px;
      }
    </style>
    <fluent-compound-button>
      Short text
      <span slot="description">Description content</span>
    </fluent-compound-button>
    <fluent-compound-button class="max-width">
      Long text wraps after it hits the max width of the component
      <span slot="description">Description content</span>
    </fluent-compound-button>
  `),
};

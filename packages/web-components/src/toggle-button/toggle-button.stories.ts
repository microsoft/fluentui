import { html, repeat } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { getStorybookHelpers } from '../../.storybook/wc-toolkit-helpers.js';
import type { ToggleButton as FluentToggleButton } from './toggle-button.js';
import { ToggleButtonAppearance, ToggleButtonShape, ToggleButtonSize } from './toggle-button.options.js';

type Story = StoryObj<FluentToggleButton>;
const { argTypes } = getStorybookHelpers<FluentToggleButton>('fluent-toggle-button');

const storyTemplate = html<StoryArgs<FluentToggleButton>>`
  <fluent-toggle-button
    ?disabled-focusable="${story => story.disabledFocusable}"
    ?disabled="${story => story.disabled}"
    ?formnovalidate="${story => story.formnovalidate}"
    ?icon-only="${story => story.iconOnly}"
    appearance="${story => story.appearance}"
    form="${story => story.form}"
    formaction="${story => story.formaction}"
    formenctype="${story => story.formenctype}"
    formmethod="${story => story.formmethod}"
    formtarget="${story => story.formtarget}"
    name="${story => story.name}"
    shape="${story => story.shape}"
    size="${story => story.size}"
    type="${story => story.type}"
    value="${story => story.value}"
    ?pressed="${x => x.pressed}"
    ?mixed="${x => x.mixed}"
  >
    ${story => story.startSlottedContent?.()} ${story => story.slottedContent?.()}
    ${story => story.endSlottedContent?.()}
  </fluent-toggle-button>
`;

export default {
  title: 'Components/Button/Toggle Button',
  render: renderComponent(storyTemplate),
  args: {
    slottedContent: () => 'Button',
  },
  argTypes,
} as Meta<FluentToggleButton>;

export const Default: Story = {};

export const Appearance: Story = {
  render: renderComponent(html`<div>${repeat(story => story.storyItems, storyTemplate)}</div> `),
  args: {
    storyItems: [
      { slottedContent: () => 'Default' },
      { slottedContent: () => 'Primary', appearance: ToggleButtonAppearance.primary },
      { slottedContent: () => 'Outline', appearance: ToggleButtonAppearance.outline },
      { slottedContent: () => 'Subtle', appearance: ToggleButtonAppearance.subtle },
      { slottedContent: () => 'Transparent', appearance: ToggleButtonAppearance.transparent },
    ],
  },
};

export const Pressed: Story = {
  render: renderComponent(html`<div>${repeat(story => story.storyItems, storyTemplate)}</div> `),
  args: {
    storyItems: [
      { slottedContent: () => 'Default Pressed', pressed: true },
      { slottedContent: () => 'Primary Pressed', appearance: ToggleButtonAppearance.primary, pressed: true },
      { slottedContent: () => 'Outline Pressed', appearance: ToggleButtonAppearance.outline, pressed: true },
      { slottedContent: () => 'Subtle Pressed', appearance: ToggleButtonAppearance.subtle, pressed: true },
      { slottedContent: () => 'Transparent Pressed', appearance: ToggleButtonAppearance.transparent, pressed: true },
    ],
  },
};

export const Shape: Story = {
  render: renderComponent(html`<div>${repeat(story => story.storyItems, storyTemplate)}</div> `),
  args: {
    storyItems: [
      { slottedContent: () => 'Rounded', shape: ToggleButtonShape.rounded },
      { slottedContent: () => 'Circular', shape: ToggleButtonShape.circular },
      { slottedContent: () => 'Square', shape: ToggleButtonShape.square },
    ],
  },
};

export const Size = renderComponent(html<StoryArgs<FluentToggleButton>>`
  <fluent-toggle-button size="small">Small</fluent-toggle-button>
  <fluent-toggle-button size="small">
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
  </fluent-toggle-button>
  <fluent-toggle-button size="small" icon-only aria-label="Small icon only button">
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
  </fluent-toggle-button>
  <fluent-toggle-button size="medium">Medium</fluent-toggle-button>
  <fluent-toggle-button size="medium">
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
  </fluent-toggle-button>
  <fluent-toggle-button size="medium" icon-only aria-label="Medium icon only button">
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
  </fluent-toggle-button>
  <fluent-toggle-button size="large">Large</fluent-toggle-button>
  <fluent-toggle-button size="large">
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
    Large with calendar icon
  </fluent-toggle-button>
  <fluent-toggle-button size="large" icon-only aria-label="Large icon only button">
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
  </fluent-toggle-button>
`);

export const Disabled = renderComponent(html<StoryArgs<FluentToggleButton>>`
  <fluent-toggle-button>Enabled state</fluent-toggle-button>
  <fluent-toggle-button disabled>Disabled state</fluent-toggle-button>
  <fluent-toggle-button disabled-focusable>Disabled focusable state</fluent-toggle-button>
  <fluent-toggle-button appearance="primary">Enabled state</fluent-toggle-button>
  <fluent-toggle-button appearance="primary" disabled>Disabled state</fluent-toggle-button>
  <fluent-toggle-button appearance="primary" disabled-focusable>Disabled focusable state</fluent-toggle-button>
`);

export const WithLongText = renderComponent(html<StoryArgs<FluentToggleButton>>`
  <style>
    .max-width {
      width: 280px;
    }
  </style>
  <fluent-toggle-button>Short text</fluent-toggle-button>
  <fluent-toggle-button class="max-width">
    Long text wraps after it hits the max width of the component
  </fluent-toggle-button>
`);

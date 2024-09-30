import { html, repeat } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { ButtonAppearance, ButtonShape, ButtonSize, ButtonType } from '../button/button.options.js';
import type { SplitButton as FluentSplitButton } from './split-button.js';

type Story = StoryObj<FluentSplitButton>;

const Down20Icon = html` <svg
  fill="currentColor"
  aria-hidden="true"
  width="1em"
  height="1em"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M15.85 7.65c.2.2.2.5 0 .7l-5.46 5.49a.55.55 0 0 1-.78 0L4.15 8.35a.5.5 0 1 1 .7-.7L10 12.8l5.15-5.16c.2-.2.5-.2.7 0Z"
    fill="currentColor"
  ></path>
</svg>`;

const storyTemplate = html<StoryArgs<FluentSplitButton>>`
  <fluent-split-button>
    <fluent-button
      ?autofocus="${story => story.autofocus}"
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
    >
      ${story => story.startSlottedContent?.()} ${story => story.slottedContent?.()}
      ${story => story.endSlottedContent?.()}
    </fluent-button>
    <fluent-button
      appearance="${story => story.appearance}"
      shape="${story => story.shape}"
      size="${story => story.size}"
      icon-only
    >
      ${Down20Icon}
    </fluent-button>
  </fluent-split-button>
`;

export default {
  title: 'Components/Button/Split-Button',
  render: renderComponent(storyTemplate),
  args: {
    disabled: false,
    disabledFocusable: false,
    slottedContent: () => 'Split Button',
  },
  argTypes: {
    appearance: {
      control: 'select',
      description: 'Indicates the styled appearance of the button.',
      options: ['', ...Object.values(ButtonAppearance)],
      mapping: { '': null, ...ButtonAppearance },
      table: {
        category: 'attributes',
        type: { summary: Object.values(ButtonAppearance).join('|') },
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
    formAction: {
      control: 'text',
      description: 'The URL that processes the form submission.',
      name: 'formaction',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    formAttribute: {
      control: 'text',
      description: 'The id of a form to associate the element to.',
      name: 'form',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    formEnctype: {
      control: 'text',
      description: 'The encoding type for the form submission.',
      name: 'formenctype',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    formMethod: {
      control: 'text',
      description: 'The HTTP method that the browser uses to submit the form.',
      name: 'formmethod',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    formNoValidate: {
      control: 'boolean',
      description: 'Indicates that the form will not be validated when submitted.',
      name: 'formnovalidate',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    formTarget: {
      control: 'text',
      description: 'The target frame or window to open the form submission in.',
      name: 'formtarget',
      table: { category: 'attributes', type: { summary: 'string' } },
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
      options: ['', ...Object.values(ButtonSize)],
      mapping: { '': null, ...ButtonSize },
      table: {
        category: 'attributes',
        type: { summary: Object.values(ButtonSize).join('|') },
      },
    },
    shape: {
      control: 'select',
      description: 'The shape of the button.',
      options: ['', ...Object.values(ButtonShape)],
      mapping: { '': null, ...ButtonShape },
      table: {
        category: 'attributes',
        type: { summary: Object.values(ButtonShape).join('|') },
      },
    },
    type: {
      control: 'select',
      description: 'The type of the button.',
      options: ['', ...Object.values(ButtonType)],
      mapping: { '': null, ...ButtonType },
      table: {
        category: 'attributes',
        type: { summary: Object.values(ButtonType).join('|') },
      },
    },
    value: {
      control: 'text',
      description: 'The initial value of the button.',
      table: { category: 'attributes', type: { summary: 'string' } },
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
} as Meta<FluentSplitButton>;

export const Default: Story = {};

export const Appearance: Story = {
  render: renderComponent(html`<div>${repeat(story => story.storyItems, storyTemplate)}</div> `),
  args: {
    storyItems: [
      { slottedContent: () => 'Default' },
      { slottedContent: () => 'Primary', appearance: ButtonAppearance.primary },
      { slottedContent: () => 'Outline', appearance: ButtonAppearance.outline },
      { slottedContent: () => 'Subtle', appearance: ButtonAppearance.subtle },
      { slottedContent: () => 'Transparent', appearance: ButtonAppearance.transparent },
    ],
  },
};

export const Shape: Story = {
  render: renderComponent(html`<div>${repeat(story => story.storyItems, storyTemplate)}</div> `),
  args: {
    storyItems: [
      { slottedContent: () => 'Rounded', shape: ButtonShape.rounded },
      { slottedContent: () => 'Circular', shape: ButtonShape.circular },
      { slottedContent: () => 'Square', shape: ButtonShape.square },
    ],
  },
};

export const Size: Story = {
  render: renderComponent(html`<div>${repeat(story => story.storyItems, storyTemplate)}</div> `),
  args: {
    storyItems: [
      { slottedContent: () => 'Small', shape: ButtonSize.small },
      { slottedContent: () => 'Medium', shape: ButtonSize.medium },
      { slottedContent: () => 'Large', shape: ButtonSize.large },
    ],
  },
};

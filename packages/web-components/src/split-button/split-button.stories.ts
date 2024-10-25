import { html, repeat } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { ButtonAppearance, ButtonShape, ButtonSize } from '../button/button.options.js';
import type { Menu as FluentMenu } from '../menu/menu.js';

type Story = StoryObj<FluentMenu>;

const defaultSlottedContent = html`
  <fluent-menu-list>
    <fluent-menu-item>Menu item 1</fluent-menu-item>
    <fluent-menu-item>Menu item 2</fluent-menu-item>
    <fluent-menu-item>Menu item 3</fluent-menu-item>
    <fluent-menu-item>Menu item 4</fluent-menu-item>
  </fluent-menu-list>
`;

const generatePimaryActionSlottedContent = (content: string = 'Primary Action') => {
  return html`<fluent-button
    appearance="${story => story.appearance}"
    shape="${story => story.shape}"
    size="${story => story.size}"
    slot="primary-action"
    >${content}</fluent-button
  >`;
};

const defaultTriggerSlottedContent = html`<fluent-menu-button
  appearance="${story => story.appearance}"
  shape="${story => story.shape}"
  size="${story => story.size}"
  slot="trigger"
  aria-label="Open menu"
  icon-only
>
</fluent-menu-button>`;

const storyTemplate = html<StoryArgs<FluentMenu>>`
  <fluent-menu split>
    ${story => story.primaryActionSlottedContent?.()} ${story => story.triggerSlottedContent?.()}
    ${story => story.slottedContent?.()}
  </fluent-menu>
`;

const link = '<a href="/docs/components-menu--docs">Menu</a>';

const storyDescription = `
The split-button is a variation of the ${link} component, refer to the ${link} for more details.
`;

export default {
  title: 'Components/Button/Split-Button',
  args: {
    primaryActionSlottedContent: () => generatePimaryActionSlottedContent(),
    slottedContent: () => defaultSlottedContent,
    triggerSlottedContent: () => defaultTriggerSlottedContent,
    split: true,
  },
  parameters: {
    docs: {
      description: {
        component: storyDescription,
      },
    },
  },
  render: renderComponent(storyTemplate),
  argTypes: {
    split: {
      control: false,
      description: 'Sets the split visual state. Used in Cordination with the `primary-action` slot.',
      name: 'split',
      table: {
        category: 'attributes',
        readonly: true,
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    appearance: {
      control: 'select',
      description: 'Indicates the styled appearance of the button.',
      options: ['', ...Object.values(ButtonAppearance)],
      mapping: { '': null, ...ButtonAppearance },
      table: {
        category: 'button attributes',
        type: { summary: Object.values(ButtonAppearance).join('|') },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the button.',
      options: ['', ...Object.values(ButtonSize)],
      mapping: { '': null, ...ButtonSize },
      table: {
        category: 'button attributes',
        type: { summary: Object.values(ButtonSize).join('|') },
      },
    },
    shape: {
      control: 'select',
      description: 'The shape of the button.',
      options: ['', ...Object.values(ButtonShape)],
      mapping: { '': null, ...ButtonShape },
      table: {
        category: 'button attributes',
        type: { summary: Object.values(ButtonShape).join('|') },
      },
    },
  },
} as Meta<FluentMenu>;

export const Default: Story = {};

export const Appearance: Story = {
  render: renderComponent(html`<div>${repeat(story => story.storyItems, storyTemplate)}</div> `),
  args: {
    storyItems: [
      {
        slottedContent: () => defaultSlottedContent,
        triggerSlottedContent: () => defaultTriggerSlottedContent,
        primaryActionSlottedContent: () => generatePimaryActionSlottedContent('Default'),
      },
      {
        slottedContent: () => defaultSlottedContent,
        triggerSlottedContent: () => defaultTriggerSlottedContent,
        primaryActionSlottedContent: () => generatePimaryActionSlottedContent('Primary'),
        appearance: ButtonAppearance.primary,
      },
      {
        slottedContent: () => defaultSlottedContent,
        triggerSlottedContent: () => defaultTriggerSlottedContent,
        primaryActionSlottedContent: () => generatePimaryActionSlottedContent('Outline'),
        appearance: ButtonAppearance.outline,
      },
      {
        slottedContent: () => defaultSlottedContent,
        triggerSlottedContent: () => defaultTriggerSlottedContent,
        primaryActionSlottedContent: () => generatePimaryActionSlottedContent('Subtle'),
        appearance: ButtonAppearance.subtle,
      },
      {
        slottedContent: () => defaultSlottedContent,
        triggerSlottedContent: () => defaultTriggerSlottedContent,
        primaryActionSlottedContent: () => generatePimaryActionSlottedContent('Transparent'),
        appearance: ButtonAppearance.transparent,
      },
    ],
  },
};

export const Shape: Story = {
  render: renderComponent(html`<div>${repeat(story => story.storyItems, storyTemplate)}</div> `),
  args: {
    storyItems: [
      {
        slottedContent: () => defaultSlottedContent,
        triggerSlottedContent: () => defaultTriggerSlottedContent,
        primaryActionSlottedContent: () => generatePimaryActionSlottedContent('Rounded'),
        shape: ButtonShape.rounded,
      },
      {
        slottedContent: () => defaultSlottedContent,
        triggerSlottedContent: () => defaultTriggerSlottedContent,
        primaryActionSlottedContent: () => generatePimaryActionSlottedContent('Circular'),
        shape: ButtonShape.circular,
      },
      {
        slottedContent: () => defaultSlottedContent,
        triggerSlottedContent: () => defaultTriggerSlottedContent,
        primaryActionSlottedContent: () => generatePimaryActionSlottedContent('Square'),
        shape: ButtonShape.square,
      },
    ],
  },
};

export const Size: Story = {
  render: renderComponent(html`<div>${repeat(story => story.storyItems, storyTemplate)}</div> `),
  args: {
    storyItems: [
      {
        slottedContent: () => defaultSlottedContent,
        triggerSlottedContent: () => defaultTriggerSlottedContent,
        primaryActionSlottedContent: () => generatePimaryActionSlottedContent('Small'),
        shape: ButtonSize.small,
      },
      {
        slottedContent: () => defaultSlottedContent,
        triggerSlottedContent: () => defaultTriggerSlottedContent,
        primaryActionSlottedContent: () => generatePimaryActionSlottedContent('Medium'),
        shape: ButtonSize.medium,
      },
      {
        slottedContent: () => defaultSlottedContent,
        triggerSlottedContent: () => defaultTriggerSlottedContent,
        primaryActionSlottedContent: () => generatePimaryActionSlottedContent('Large'),
        shape: ButtonSize.large,
      },
    ],
  },
};

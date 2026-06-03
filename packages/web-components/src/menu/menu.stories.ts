import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { getStorybookHelpers } from '../../.storybook/wc-toolkit-helpers.js';
import type { Menu as FluentMenu } from './menu.js';

type Story = StoryObj<FluentMenu>;
const { argTypes } = getStorybookHelpers<FluentMenu>('fluent-menu');

const defaultSlottedContent = html`
  <fluent-menu-list>
    <fluent-menu-item>Menu item 1</fluent-menu-item>
    <fluent-menu-item>Menu item 2</fluent-menu-item>
    <fluent-menu-item>Menu item 3</fluent-menu-item>
    <fluent-menu-item>Menu item 4</fluent-menu-item>
  </fluent-menu-list>
`;

const defaultTriggerSlottedContent = html`<fluent-menu-button
  aria-label="Toggle Menu"
  appearance="primary"
  slot="trigger"
  >Toggle Menu</fluent-menu-button
>`;

const storyTemplate = html<StoryArgs<FluentMenu>>`
  <fluent-menu
    ?split="${story => story.split}"
    ?open-on-hover="${story => story.openOnHover}"
    ?open-on-context="${story => story.openOnContext}"
    ?close-on-scroll="${story => story.closeOnScroll}"
    ?persist-on-item-click="${story => story.persistOnItemClick}"
    style="${story => (story['--menu-max-height'] !== '' ? `--menu-max-height: ${story['--menu-max-height']};` : '')}"
  >
    ${story => story.primaryActionSlottedContent?.()} ${story => story.triggerSlottedContent?.()}
    ${story => story.slottedContent?.()}
  </fluent-menu>
`;

const generatePimaryActionSlottedContent = (content: string = 'Primary Action') => {
  return html`<fluent-button appearance="primary" slot="primary-action">${content}</fluent-button>`;
};

export default {
  title: 'Components/Menu',
  render: renderComponent(storyTemplate),
  args: {
    slottedContent: () => defaultSlottedContent,
    triggerSlottedContent: () => defaultTriggerSlottedContent,
    '--menu-max-height': 'auto',
  },
  argTypes,
} as Meta<FluentMenu>;

export const Default: Story = {};

export const MenuOpenOnHover: Story = {
  args: {
    openOnHover: true,
  },
};

export const MenuOpenOnContext: Story = {
  args: {
    openOnContext: true,
  },
};

export const MenuWithMaxHeight: Story = {
  args: {
    '--menu-max-height': '10rem',
    slottedContent: () => html`<fluent-menu-list>
      <fluent-menu-item>Menu item 1</fluent-menu-item>
      <fluent-menu-item>Menu item 2</fluent-menu-item>
      <fluent-menu-item>Menu item 3</fluent-menu-item>
      <fluent-menu-item>Menu item 4</fluent-menu-item>
      <fluent-menu-item>Menu item 5</fluent-menu-item>
      <fluent-menu-item>Menu item 6</fluent-menu-item>
      <fluent-menu-item>Menu item 7</fluent-menu-item>
      <fluent-menu-item>Menu item 8</fluent-menu-item>
    </fluent-menu-list>`,
  },
};

export const MenuWithInteractiveItems: Story = {
  args: {
    slottedContent: () => html`
      <fluent-menu-list>
        <fluent-menu-item>
          Item 1
          <fluent-menu-list slot="submenu">
            <fluent-menu-item> Subitem 1 </fluent-menu-item>
            <fluent-menu-item> Subitem 2 </fluent-menu-item>
          </fluent-menu-list>
        </fluent-menu-item>

        <fluent-menu-item role="menuitemcheckbox"> Item 2 </fluent-menu-item>
        <fluent-menu-item role="menuitemcheckbox"> Item 3 </fluent-menu-item>

        <fluent-divider role="separator" aria-orientation="horizontal" orientation="horizontal"></fluent-divider>

        <fluent-menu-item>Menu item 4</fluent-menu-item>
        <fluent-menu-item>Menu item 5</fluent-menu-item>
        <fluent-menu-item>Menu item 6</fluent-menu-item>

        <fluent-menu-item>Menu item 7</fluent-menu-item>
        <fluent-menu-item>Menu item 8</fluent-menu-item>
      </fluent-menu-list>
    `,
  },
};

const link = '<a href="/docs/components-button-split-button--docs">split-button</a>';

const storyDescription = `
  The split-button variation, refer to ${link} for more examples.
`;

export const SplitButton: Story = {
  parameters: {
    docs: {
      description: {
        story: storyDescription,
      },
    },
  },
  args: {
    split: true,
    triggerSlottedContent: () => html`<fluent-menu-button
      aria-label="Toggle Menu"
      appearance="primary"
      slot="trigger"
      icon-only
    ></fluent-menu-button>`,
    primaryActionSlottedContent: () => html`${generatePimaryActionSlottedContent()}`,
  },
};

import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';

import type { TreeItem as FluentTreeItem, TreeItem } from './tree-item.js';
import { TreeItemAppearance, TreeItemSize } from './tree-item.options.js';

type Story = StoryObj<FluentTreeItem>;

const CalendarIcon = html`<svg
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
</svg>`;
const FilterIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    d="M7.5 13h5a.5.5 0 0 1 .09.992L12.5 14h-5a.5.5 0 0 1-.09-.992zh5zm-2-4h9a.5.5 0 0 1 .09.992L14.5 10h-9a.5.5 0 0 1-.09-.992zh9zm-2-4h13a.5.5 0 0 1 .09.992L16.5 6h-13a.5.5 0 0 1-.09-.992zh13z"
  ></path>
</svg>`;

const storyTemplate = html<StoryArgs<FluentTreeItem>>`
  <fluent-tree-item
    size="${x => x.size}"
    appearance="${x => x.appearance}"
    @click=${(story, context) => {
      const target = context.eventTarget() as FluentTreeItem;
      target.toggleExpansion();
      const items = document.querySelectorAll('fluent-tree-item');
      items.forEach(item => {
        if (item !== target) {
          (item as TreeItem).selected = false;
        }
      });
      target.selected = true;
    }}
  >
    ${story => story.startSlottedContent?.()} ${story => story.slottedContent?.()}
    ${story => story.endSlottedContent?.()} ${story => story.asideSlottedContent?.()}
    ${story => story.itemSlottedContent?.()}
  </fluent-tree-item>
`;

export default {
  title: 'Components/Tree/Tree-Item',
  component: 'tree-item',
  render: renderComponent(storyTemplate),
  args: {
    size: TreeItemSize.medium,
    appearance: TreeItemAppearance.subtle,
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(TreeItemSize),
      description: 'Sets the visual appearance of the control',
      table: {
        defaultValue: {
          summary: 'medium',
        },
      },
      category: 'attributes',
    },
    appearance: {
      control: 'select',
      options: Object.values(TreeItemAppearance),
      description: 'The appearance variants of the tree item element',
      table: {
        defaultValue: {
          summary: 'subtle',
        },
      },
      category: 'attributes',
    },
    slottedContent: {
      control: false,
      description: 'The default slot',
      name: '',
      table: { category: 'slots', type: {} },
    },
    startSlottedContent: {
      control: false,
      description: 'The start slot - appears before content',
      name: 'start',
      table: { category: 'slots', type: {} },
    },
    endSlottedContent: {
      control: false,
      description: 'The end slot - appears after content',
      name: 'end',
      table: { category: 'slots', type: {} },
    },
    asideSlottedContent: {
      control: false,
      description: 'The aside slot - appears at the far end of the tree-item',
      name: 'aside',
      table: { category: 'slots', type: {} },
    },
    itemSlottedContent: {
      control: false,
      description: 'The item slot - where the child tree-items are automatically slotted',
      name: 'item',
      table: { category: 'slots', type: {} },
    },
  },
} as Meta<FluentTreeItem>;

export const Default: Story = {
  args: {
    slottedContent: () => 'Item 1',
  },
};

export const Small: Story = {
  args: {
    slottedContent: () => 'small',
    size: TreeItemSize.small,
  },
};

export const SubtleAlpha: Story = {
  args: {
    slottedContent: () => 'subtle-alpha',
    appearance: TreeItemAppearance.subtleAlpha,
  },
};

export const Transparent: Story = {
  args: {
    slottedContent: () => 'transparent',
    appearance: TreeItemAppearance.transparent,
  },
};

export const LongText: Story = {
  args: {
    slottedContent: () => 'Really long tree-item content goes here. Lorem ipsum dolor sit amet.',
  },
};

export const StartSlot: Story = {
  args: {
    slottedContent: () => 'Item 1',
    startSlottedContent: () => html`<span slot="start">${CalendarIcon}</span>`,
  },
};

export const EndSlot: Story = {
  args: {
    slottedContent: () => 'Item 1',
    endSlottedContent: () => html`<span slot="end">${FilterIcon}</span>`,
  },
};

export const StartAndEndSlot: Story = {
  args: {
    slottedContent: () => 'Item 1',
    startSlottedContent: () => html`<span slot="start">${CalendarIcon}</span>`,
    endSlottedContent: () => html`<span slot="end">${FilterIcon}</span>`,
  },
};

export const NestedTreeItem: Story = {
  args: {
    slottedContent: () => html`
      Item 1
      <fluent-tree-item>
        Item 1-1
        <fluent-tree-item
          ><span slot="start">${CalendarIcon}</span>Item 1-1<span slot="end">${FilterIcon}</span></fluent-tree-item
        >
        <fluent-tree-item>Item 1-1-2</fluent-tree-item>
        <fluent-tree-item>Item 1-1-3<span slot="end">${FilterIcon}</span></fluent-tree-item>
      </fluent-tree-item>
    `,
  },
};

export const AsideSlot: Story = {
  args: {
    slottedContent: () => 'Item 1',
    asideSlottedContent: () => html`<span slot="aside">${FilterIcon}</span>`,
  },
};

export const ToggleEvent: Story = {
  render: renderComponent(html<StoryArgs<FluentTreeItem>>`
    <fluent-tree-item
      @click=${(story, context) => {
        const target = context.eventTarget() as FluentTreeItem;
        target.toggleExpansion();
      }}
      @toggle=${(c, e) => {
        console.log('toggle', (e.event as any)?.detail);
      }}
    >
      Item 1
      <fluent-tree-item>Item 1-1</fluent-tree-item>
    </fluent-tree-item>
  `),
};

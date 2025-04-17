import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { TreeItemAppearance, TreeItemSize } from '../tree-item/tree-item.options.js';
import type { Tree as FluentTree } from './tree.js';

type Story = StoryObj<FluentTree>;

const storyTemplate = html<StoryArgs<FluentTree>>`
  <fluent-tree size="${x => x.size}" appearance="${x => x.appearance}">
    <fluent-tree-item expanded>
      Item 1
      <fluent-tree-item>
        <span slot="start">
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
        </span>
        Item 1-1
      </fluent-tree-item>
      <fluent-tree-item>
        Item 1-2
        <span slot="end">
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
        </span>
      </fluent-tree-item>
      <fluent-tree-item>
        <span slot="start">
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
        </span>
        Item 1-3
        <span slot="end">
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
        </span>
      </fluent-tree-item>
    </fluent-tree-item>
    <fluent-tree-item expanded>
      Item 2
      <svg
        slot="aside"
        fill="red"
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.2 8.83a.2.2 0 0 1-.4 0l-.86-4.56a1.07 1.07 0 1 1 2.12 0L8.2 8.83ZM8 2a2.07 2.07 0 0 0-2.04 2.46l.86 4.56a1.2 1.2 0 0 0 2.36 0l.86-4.56A2.07 2.07 0 0 0 8 2Zm0 11a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
          fill="red"
        ></path>
      </svg>
      <fluent-tree-item>
        Item 2-1
        <fluent-tree-item>
          Item 2-1-1
          <fluent-tree-item selected>Item 2-1-1-1</fluent-tree-item>
          <fluent-tree-item>Item 2-1-1-1</fluent-tree-item>
        </fluent-tree-item>
        <fluent-tree-item>Item 2-1-2</fluent-tree-item>
      </fluent-tree-item>
      <fluent-tree-item>Item 2-2</fluent-tree-item>
      <fluent-tree-item> Item 2-3 </fluent-tree-item>
    </fluent-tree-item>
  </fluent-tree>
`;

export default {
  title: 'Components/Tree',
  component: 'tree',
  render: renderComponent(storyTemplate),
  args: {
    size: TreeItemSize.medium,
    appearance: TreeItemAppearance.subtle,
  },
  argTypes: {
    slottedContent: {
      control: false,
      description: 'The default slot',
      name: '',
      table: { category: 'slots', type: {} },
    },
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
  },
} as Meta<FluentTree>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: TreeItemSize.small,
  },
};

export const SubtleAlpha: Story = {
  args: {
    appearance: TreeItemAppearance.subtleAlpha,
  },
};

export const Transparent: Story = {
  args: {
    appearance: TreeItemAppearance.transparent,
  },
};

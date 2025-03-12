import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Tree as FluentTree } from './tree.js';
import './define.js';
import { treeItemAppearance, treeItemSize } from '../tree-item/tree-item.options.js';

type TreeStoryArgs = Args & FluentTree;
type TreeStoryMeta = Meta<TreeStoryArgs>;

const storyTemplate = html<TreeStoryArgs>`
<fluent-tree size="${x => x.size}" appearance="${x => x.appearance}">
  <fluent-tree-item >
    Item 1
    <fluent-tree-item>Item 1-1
    </fluent-tree-item>
    <fluent-tree-item>Item 1-2</fluent-tree-item>
    <fluent-tree-item>Item 1-3</fluent-tree-item>
  </fluent-tree-item>
  <fluent-tree-item expanded>
    Item 2
    <fluent-tree-item expanded>
      Item 2-1
      <fluent-tree-item>
        Item 2-1-1
        <fluent-tree-item>Item 2-1-1-1</fluent-tree-item>
        <fluent-tree-item>Item 2-1-1-1</fluent-tree-item>
      </fluent-tree-item>
      <fluent-tree-item>Item 2-1-2</fluent-tree-item>
    </fluent-tree-item>
    <fluent-tree-item>Item 2-2</fluent-tree-item>
    <fluent-tree-item>
      Item 2-3
    </fluent-tree-item>
  </fluent-tree-item>
</fluent-tree>
`;

export default {
  title: 'Components/Tree',
  args: {
    size: 'medium',
    appearance: 'subtle',
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
      options: Object.values(treeItemSize),
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
      options: Object.values(treeItemAppearance),
      description: 'The appearance variants of the tree item element',
      table: {
        defaultValue: {
          summary: 'subtle',
        },
      },
      category: 'attributes',
    },
  },
} as TreeStoryMeta;

export const Tree = renderComponent(storyTemplate).bind({});

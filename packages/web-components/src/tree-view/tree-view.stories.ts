import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { TreeView as FluentTreeView } from './tree-view.js';
import '../tree-view/define.js';
import { treeItemAppearance, treeItemSize } from '../tree-item/tree-item.options.js';

type TreeViewStoryArgs = Args & FluentTreeView;
type TreeViewStoryMeta = Meta<TreeViewStoryArgs>;

const storyTemplate = html<TreeViewStoryArgs>`
<fluent-tree-view size="${x => x.size}" appearance="${x => x.appearance}">
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
      <div slot="start">Start</div>
      <div slot="end">&nbsp End</div>
    </fluent-tree-item>
  </fluent-tree-item>
</fluent-tree-view>
`;

export default {
  title: 'Components/TreeView',
  args: {
    size: 'medium',
    appearance: 'subtle',
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(treeItemSize),
      description: 'Sets the visual appearance of the control',
      table: {
        defaultValue: {
          summary: 'medium',
        },
      },
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
    },
  },
} as TreeViewStoryMeta;

export const TreeView = renderComponent(storyTemplate).bind({});

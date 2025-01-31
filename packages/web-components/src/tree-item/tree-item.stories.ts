import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { TreeItem as FluentTreeItem } from './tree-item.js';
import './define.js';

type TreeItemStoryArgs = Args & FluentTreeItem;
type TreeItemStoryMeta = Meta<TreeItemStoryArgs>;

const storyTemplate = html<TreeItemStoryArgs>`
  <fluent-tree-item ?selected="${x => x.selected}" ?disabled="${x => x.disabled}" ?expanded="${x => x.expanded}">
    Item 1
    <fluent-tree-item>Item 1-1</fluent-tree-item>
    <fluent-tree-item>Item 1-2</fluent-tree-item>
    <fluent-tree-item>Item 1-3</fluent-tree-item>
  </fluent-tree-item>
  <fluent-tree-item expanded>
    Item 2
    <fluent-tree-item>Item 2-1</fluent-tree-item>
    <fluent-tree-item>Item 2-2</fluent-tree-item>
    <fluent-tree-item>
      Item 2-3
      <div slot="start">Start</div>
      <div slot="end">&nbspEnd</div>
    </fluent-tree-item>
  </fluent-tree-item>
`;

export default {
  title: 'Components/TreeItem',
  args: {
    disabled: false,
    expanded: false,
    selected: false,
  },
  argTypes: {
    slottedContent: {
      control: false,
      description: 'The default slot',
      name: '',
      table: { category: 'slots', type: {} },
    },
    slottedChevron: {
      control: false,
      description: 'The chevron icon slot',
      name: 'chevron',
      table: { category: 'slots', type: {} },
    },
    slottedStart: {
      control: false,
      description: 'The start region slot',
      name: 'start',
      table: { category: 'slots', type: {} },
    },
    slottedMiddle: {
      control: false,
      description: 'The middle regin slot, usually it is same as default slot',
      name: 'middle',
      table: { category: 'slots', type: {} },
    },
    slottedEnd: {
      control: false,
      description: 'The end region slot',
      name: 'end',
      table: { category: 'slots', type: {} },
    },
    slottedBadging: {
      control: false,
      description: 'The badging slot',
      name: 'badging',
      table: { category: 'slots', type: {} },
    },
    slottedToolbar: {
      control: false,
      description: 'The toolbar slot',
      name: 'toolbar',
      table: { category: 'slots', type: {} },
    },
    expanded: {
      control: {
        type: 'boolean',
      },
      table: {
        type: {
          summary: 'When true, the control will be appear expanded by user interaction',
        },
        defaultValue: {
          summary: 'false',
        },
        category: 'attributes',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      table: {
        type: {
          summary:
            'When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled | disabled HTML attribute} for more information',
        },
        defaultValue: {
          summary: 'false',
        },
        category: 'attributes',
      },
    },
    selected: {
      control: {
        type: 'boolean',
      },
      table: {
        type: {
          summary: 'When true, the control will appear selected by user interaction',
        },
        defaultValue: {
          summary: 'false',
        },
        category: 'attributes',
      },
    },
  },
} as TreeItemStoryMeta;

export const TreeItem = renderComponent(storyTemplate).bind({});

//
// Attribute stories
//

export const Selected = renderComponent(html<TreeItemStoryArgs>`
  <fluent-tree-item selected>Item 1</fluent-tree-item>
  <fluent-tree-item>Item 2</fluent-tree-item>
  <fluent-tree-item selected>Item 3</fluent-tree-item>
`);

export const Disabled = renderComponent(html<TreeItemStoryArgs>`
  <fluent-tree-item disabled>Item 1</fluent-tree-item>
  <fluent-tree-item>Item 2</fluent-tree-item>
  <fluent-tree-item disabled>Item 3</fluent-tree-item>
`);

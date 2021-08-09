import { fluentTreeItem } from './index';

export default {
  title: 'Components/Tree Item',
  component: fluentTreeItem,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    selected: {
      control: { type: 'boolean' },
    },
  },
};

const TreeItemTemplate = ({ disabled, label, selected }) => `
  <fluent-tree-item
    ${disabled ? 'disabled' : ''}
    ${selected ? 'selected' : ''}
  >${label}</fluent-tree-item>`;

export const TreeItem = TreeItemTemplate.bind({});

TreeItem.args = {
  label: 'Tree Item',
};

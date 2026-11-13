// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Tree,
  TreeItem,
  TreeItemLayout,
  renderTree,
  renderTreeItem,
  renderTreeItemLayout,
  useSubtreeContext,
  useTree,
  useTreeContext,
  useTreeContextValues,
  useTreeItem,
  useTreeItemContext,
  useTreeItemContextValues,
  useTreeItemLayout,
} from '@fluentui/react-headless-components-preview/tree';

console.log(
  Tree,
  TreeItem,
  TreeItemLayout,
  renderTree,
  renderTreeItem,
  renderTreeItemLayout,
  useSubtreeContext,
  useTree,
  useTreeContext,
  useTreeContextValues,
  useTreeItem,
  useTreeItemContext,
  useTreeItemContextValues,
  useTreeItemLayout,
);

export default {
  name: '@fluentui/react-headless-components-preview/tree',
};

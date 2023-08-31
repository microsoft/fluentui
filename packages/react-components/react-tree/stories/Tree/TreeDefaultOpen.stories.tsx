import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components';

export const DefaultOpen = () => (
  <Tree aria-label="Default Open" defaultOpenItems={['default-subtree-1', 'default-subtree-2', 'default-subtree-2-1']}>
    <TreeItem itemType="branch" value="default-subtree-1">
      <TreeItemLayout>level 1, item 1</TreeItemLayout>
      <Tree>
        <TreeItem itemType="leaf">
          <TreeItemLayout>level 2, item 1</TreeItemLayout>
        </TreeItem>
        <TreeItem itemType="leaf">
          <TreeItemLayout>level 2, item 2</TreeItemLayout>
        </TreeItem>
        <TreeItem itemType="leaf">
          <TreeItemLayout>level 2, item 3</TreeItemLayout>
        </TreeItem>
      </Tree>
    </TreeItem>
    <TreeItem itemType="branch" value="default-subtree-2">
      <TreeItemLayout>level 1, item 2</TreeItemLayout>
      <Tree>
        <TreeItem itemType="branch" value="default-subtree-2-1">
          <TreeItemLayout>level 2, item 1</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 3, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 3, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 3, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </TreeItem>
  </Tree>
);

DefaultOpen.parameters = {
  docs: {
    description: {
      story: `
Use the \`defaultOpenItems\` prop in the \`Tree\` component to set the default open or closed state for expandable tree item components. It takes an [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol) (like an array or a set) of open IDs, opening only the \`TreeItem\` components with those IDs on initial render, while all others are closed.
      `,
    },
  },
};

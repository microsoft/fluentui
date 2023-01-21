import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree';

export const Size = () => {
  return (
    <>
      <Tree size="medium" aria-label="Tree">
        <TreeItem>
          <TreeItemLayout>Medium size tree item</TreeItemLayout>
        </TreeItem>
      </Tree>
      <Tree size="small" aria-label="Tree">
        <TreeItem>
          <TreeItemLayout>Small size tree item</TreeItemLayout>
        </TreeItem>
      </Tree>
    </>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'A tree item supports `small` and `medium` sizes.',
    },
  },
};

import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree';
import story from './TreeSize.md';

export const Size = () => {
  return (
    <>
      <Tree size="medium" aria-label="Tree">
        <TreeItem>
          <TreeItemLayout>Medium size tree item</TreeItemLayout>
          <Tree>
            <TreeItem>
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem>
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem>
              <TreeItemLayout>level 2, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>

      <Tree size="small" aria-label="Tree">
        <TreeItem>
          <TreeItemLayout>Small size tree item</TreeItemLayout>
          <Tree>
            <TreeItem>
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem>
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem>
              <TreeItemLayout>level 2, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </>
  );
};

Size.parameters = {
  docs: {
    description: {
      story,
    },
  },
};

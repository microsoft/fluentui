import * as React from 'react';
import { Tree, TreeItem } from '@fluentui/react-tree';

export const Size = () => {
  return (
    <>
      <Tree size="medium" aria-label="Tree">
        <TreeItem>
          Medium size tree item
          <Tree>
            <TreeItem>level 2, item 1</TreeItem>
            <TreeItem>level 2, item 2</TreeItem>
            <TreeItem>level 2, item 3</TreeItem>
          </Tree>
        </TreeItem>
      </Tree>

      <Tree size="small" aria-label="Tree">
        <TreeItem>
          Small size tree item
          <Tree>
            <TreeItem>level 2, item 1</TreeItem>
            <TreeItem>level 2, item 2</TreeItem>
            <TreeItem>level 2, item 3</TreeItem>
          </Tree>
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

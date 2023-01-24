import * as React from 'react';
import { Tree, TreeItem } from '@fluentui/react-tree';

export const Default = () => {
  return (
    <Tree aria-label="Tree">
      <TreeItem>
        level 1, item 1
        <Tree>
          <TreeItem>level 2, item 1</TreeItem>
          <TreeItem>level 2, item 2</TreeItem>
          <TreeItem>level 2, item 3</TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem>
        level 1, item 2
        <Tree>
          <TreeItem>
            level 2, item 1
            <Tree>
              <TreeItem>level 3, item 1</TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

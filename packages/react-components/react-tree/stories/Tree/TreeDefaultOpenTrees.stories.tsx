import * as React from 'react';
import { Tree, TreeItem } from '@fluentui/react-tree';

export const DefaultOpenTrees = () => {
  const defaultOpenTrees = ['default-subtree-1', 'default-subtree-2', 'default-subtree-2-1'];

  return (
    <Tree aria-label="Tree" defaultOpenItems={defaultOpenTrees}>
      <TreeItem id="default-subtree-1">
        level 1, item 1
        <Tree>
          <TreeItem>level 2, item 1</TreeItem>
          <TreeItem>level 2, item 2</TreeItem>
          <TreeItem>level 2, item 3</TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem id="default-subtree-2">
        level 1, item 2
        <Tree>
          <TreeItem id="default-subtree-2-1">
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

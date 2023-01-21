import * as React from 'react';
import { Tree, TreeItem } from '@fluentui/react-tree';

export const DefaultOpenTrees = () => {
  const defaultOpenTrees = ['default-subtree-1', 'default-subtree-2', 'default-subtree-2-1'];

  return (
    <Tree aria-label="Tree" defaultOpenItems={defaultOpenTrees}>
      <TreeItem aria-owns="default-subtree-1">level 1, item 1</TreeItem>
      <Tree id="default-subtree-1">
        <TreeItem>level 2, item 1</TreeItem>
        <TreeItem>level 2, item 2</TreeItem>
        <TreeItem>level 2, item 3</TreeItem>
      </Tree>
      <TreeItem aria-owns="default-subtree-2">level 1, item 2</TreeItem>
      <Tree id="default-subtree-2">
        <TreeItem aria-owns="default-subtree-2-1">level 2, item 1</TreeItem>
        <Tree id="default-subtree-2-1">
          <TreeItem>level 3, item 1</TreeItem>
        </Tree>
      </Tree>
    </Tree>
  );
};

import * as React from 'react';
import { Tree, TreeItem } from '@fluentui/react-tree';

export const Size = () => {
  return (
    <Tree aria-label="Tree">
      <TreeItem size="medium" aria-owns="default-subtree-1">
        Medium size
      </TreeItem>
      <Tree id="default-subtree-1">
        <TreeItem size="medium">Medium size subtree</TreeItem>
        <TreeItem size="medium">Medium size subtree</TreeItem>
      </Tree>
      <TreeItem size="small" aria-owns="default-subtree-2">
        Small size
      </TreeItem>
      <Tree id="default-subtree-2">
        <TreeItem size="small">Small size subtree</TreeItem>
        <TreeItem size="small">Small size subtree</TreeItem>
      </Tree>
      <TreeItem size="medium" aria-owns="default-subtree-3">
        Mixed size
      </TreeItem>
      <Tree id="default-subtree-3">
        <TreeItem size="small">Small size subtree</TreeItem>
        <TreeItem size="medium">Meidum size subtree</TreeItem>
      </Tree>
    </Tree>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'A tree item supports `small` and `medium` sizes.',
    },
  },
};

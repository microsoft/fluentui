import * as React from 'react';
import { Tree, TreeItem } from '@fluentui/react-tree';

export const Size = () => {
  return (
    <>
      <Tree size="medium" aria-label="Tree">
        <TreeItem>Medium size tree item</TreeItem>
      </Tree>
      <Tree size="small" aria-label="Tree">
        <TreeItem>Small size tree item</TreeItem>
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

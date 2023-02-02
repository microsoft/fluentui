import * as React from 'react';
import { Tree, TreeItem } from '@fluentui/react-tree';

export const Appearance = () => {
  return (
    <>
      <Tree aria-label="Tree">
        <TreeItem>
          Subtle tree item
          <Tree>
            <TreeItem>level 2, item 1</TreeItem>
            <TreeItem>level 2, item 2</TreeItem>
            <TreeItem>level 2, item 3</TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
      <Tree appearance="subtle-alpha" aria-label="Tree">
        <TreeItem>
          Subtle-alpha tree item
          <Tree>
            <TreeItem>level 2, item 1</TreeItem>
            <TreeItem>level 2, item 2</TreeItem>
            <TreeItem>level 2, item 3</TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
      <Tree appearance="transparent" aria-label="Tree">
        <TreeItem>
          Transparent tree item
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

Appearance.parameters = {
  docs: {
    description: {
      story:
        '- `(undefined)`: the tree item appears with the default style\n' +
        '- `subtle`: minimizes emphasis on hovered or focused states\n' +
        '- `transparent`: removes background color.\n',
    },
  },
};

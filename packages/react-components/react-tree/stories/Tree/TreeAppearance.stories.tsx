import * as React from 'react';
import { Tree, TreeItem } from '@fluentui/react-tree';

export const Appearance = () => {
  return (
    <Tree aria-label="Tree">
      <TreeItem aria-owns="default-subtree-1">Default tree</TreeItem>
      <Tree id="default-subtree-1">
        <TreeItem>Default tree items</TreeItem>
        <TreeItem>Default tree items</TreeItem>
      </Tree>
      <TreeItem appearance="subtle-alpha" aria-owns="default-subtree-2">
        Subtle alpha appearance
      </TreeItem>
      <Tree id="default-subtree-2">
        <TreeItem appearance="subtle-alpha">Subtle alpha item</TreeItem>
        <TreeItem appearance="subtle-alpha">Subtle alpha item</TreeItem>
      </Tree>
      <TreeItem appearance="transparent" aria-owns="default-subtree-3">
        Transparent
      </TreeItem>
      <Tree id="default-subtree-3">
        <TreeItem appearance="transparent">Transparent item</TreeItem>
        <TreeItem appearance="transparent">Transparent item</TreeItem>
      </Tree>
    </Tree>
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

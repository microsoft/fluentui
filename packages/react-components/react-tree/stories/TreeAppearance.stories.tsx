import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree';

export const Appearance = () => {
  return (
    <>
      <Tree aria-label="Tree">
        <TreeItem itemType="branch">
          <TreeItemLayout>Default appearance</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
      <br />
      <Tree appearance="subtle-alpha" aria-label="Tree">
        <TreeItem itemType="branch">
          <TreeItemLayout>Subtle-alpha appearance</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
      <br />
      <Tree appearance="transparent" aria-label="Tree">
        <TreeItem itemType="branch">
          <TreeItemLayout>Transparent appearance</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
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
        'A tree can have the following `appearance` variants:\n' +
        '- `subtle`: the default appearance.\n' +
        '- `subtle-alpha`: minimizes emphasis on hovered or focused states.\n' +
        '- `transparent`: no background color.\n',
    },
  },
};

import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components';

export const Appearance = () => {
  return (
    <>
      <Tree aria-label="Default Appearance">
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
      <Tree aria-label="Subtle Alpha Appearance" appearance="subtle-alpha">
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
      <Tree aria-label="Transparent Appearance" appearance="transparent">
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
      story: `
A tree can have the following \`appearance\` variants:
- \`subtle\`: the default appearance.
- \`subtle-alpha\`: minimizes emphasis on hovered or focused states.
- \`transparent\`: no background color.
      `,
    },
  },
};

import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components';

export const Size = () => {
  return (
    <>
      <Tree size="small" aria-label="Small Size Tree">
        <TreeItem itemType="branch">
          <TreeItemLayout>Small size tree</TreeItemLayout>
          <Tree>
            <TreeItem itemType="branch">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
              <Tree>
                <TreeItem itemType="leaf">
                  <TreeItemLayout>level 3, item 1</TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
      <Tree aria-label="Default Size Tree">
        <TreeItem itemType="branch">
          <TreeItemLayout>Medium size tree</TreeItemLayout>
          <Tree>
            <TreeItem itemType="branch">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
              <Tree>
                <TreeItem itemType="leaf">
                  <TreeItemLayout>level 3, item 1</TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: `
A tree can be displayed in a \`small\` or \`medium\` (default) size.
      `,
    },
  },
};

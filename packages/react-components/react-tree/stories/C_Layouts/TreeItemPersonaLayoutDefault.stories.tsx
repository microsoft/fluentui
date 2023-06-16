import * as React from 'react';
import { Avatar } from '@fluentui/react-components';
import { Tree, TreeItem, TreeItemPersonaLayout } from '@fluentui/react-tree';

export const DefaultTreeItemPersonaLayout = () => {
  return (
    <Tree aria-label="Tree">
      <TreeItem itemType="branch">
        <TreeItemPersonaLayout media={<Avatar />}>content</TreeItemPersonaLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemPersonaLayout media={<Avatar />}>content</TreeItemPersonaLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemPersonaLayout media={<Avatar />}>content</TreeItemPersonaLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemPersonaLayout media={<Avatar />}>content</TreeItemPersonaLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch">
        <TreeItemPersonaLayout media={<Avatar />}>content</TreeItemPersonaLayout>
        <Tree>
          <TreeItem itemType="branch">
            <TreeItemPersonaLayout media={<Avatar />}>content</TreeItemPersonaLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemPersonaLayout media={<Avatar />}>content</TreeItemPersonaLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

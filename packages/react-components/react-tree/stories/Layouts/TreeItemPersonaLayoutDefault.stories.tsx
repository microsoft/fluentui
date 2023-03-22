import * as React from 'react';
import { Avatar } from '@fluentui/react-components';
import { Tree, TreeItem, TreeItemPersonaLayout } from '@fluentui/react-tree';

export const DefaultTreeItemPersonaLayout = () => {
  return (
    <Tree aria-label="Tree">
      <TreeItem>
        <TreeItemPersonaLayout media={<Avatar />}>content</TreeItemPersonaLayout>
        <Tree>
          <TreeItem>
            <TreeItemPersonaLayout media={<Avatar />}>content</TreeItemPersonaLayout>
          </TreeItem>
          <TreeItem>
            <TreeItemPersonaLayout media={<Avatar />}>content</TreeItemPersonaLayout>
          </TreeItem>
          <TreeItem>
            <TreeItemPersonaLayout media={<Avatar />}>content</TreeItemPersonaLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem>
        <TreeItemPersonaLayout media={<Avatar />}>content</TreeItemPersonaLayout>
        <Tree>
          <TreeItem>
            <TreeItemPersonaLayout media={<Avatar />}>content</TreeItemPersonaLayout>
            <Tree>
              <TreeItem>
                <TreeItemPersonaLayout media={<Avatar />}>content</TreeItemPersonaLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

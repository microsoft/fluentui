import * as React from 'react';
import { Avatar } from '@fluentui/react-components';
import { Tree, TreeItem, TreeItemPersonaLayout } from '@fluentui/react-tree';
import story from './TreeItemPersonaLayoutWithDescription.md';

export const WithDescription = () => {
  return (
    <Tree aria-label="Tree">
      <TreeItem itemType="branch">
        <TreeItemPersonaLayout description="Secondary text content" media={<Avatar />}>
          Primary text content
        </TreeItemPersonaLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemPersonaLayout description="description" media={<Avatar />}>
              content
            </TreeItemPersonaLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemPersonaLayout description="description" media={<Avatar />}>
              content
            </TreeItemPersonaLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemPersonaLayout description="description" media={<Avatar />}>
              content
            </TreeItemPersonaLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch">
        <TreeItemPersonaLayout description="Secondary text content" media={<Avatar />}>
          Primary text content
        </TreeItemPersonaLayout>
        <Tree>
          <TreeItem itemType="branch">
            <TreeItemPersonaLayout description="description" media={<Avatar />}>
              content
            </TreeItemPersonaLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemPersonaLayout description="description" media={<Avatar />}>
                  content
                </TreeItemPersonaLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

WithDescription.parameters = {
  docs: {
    description: {
      story,
    },
  },
};

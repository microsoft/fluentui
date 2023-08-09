import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree-preview';
import { Image20Regular, LockClosed20Regular, Person20Regular, Warning20Regular } from '@fluentui/react-icons';

export const IconBeforeAfter = () => {
  return (
    <Tree aria-label="Tree">
      <TreeItem itemType="branch">
        <TreeItemLayout iconBefore={<Image20Regular />} iconAfter={<LockClosed20Regular />}>
          level 1, item 1
        </TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout iconBefore={<Person20Regular />}>icon before</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout iconBefore={<Person20Regular />}>icon before</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch">
        <TreeItemLayout iconBefore={<Image20Regular />} iconAfter={<LockClosed20Regular />}>
          level 1, item 2
        </TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout iconAfter={<Warning20Regular />}>icon after</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

IconBeforeAfter.parameters = {
  docs: {
    name: 'Icon Before/After',
    description: {
      story: `
\`TreeItemLayout\` component allows you to add icons before or after the content.

> ⚠️ iconBefore and  iconAfter are marked as \`aria-hidden\` by default`,
    },
  },
};

import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components';
import { Image20Regular, LockClosed20Regular, Person20Regular, Warning20Regular } from '@fluentui/react-icons';

export const IconBeforeAndAfter = () => {
  return (
    <Tree aria-label="Icon Before & After">
      <TreeItem itemType="branch">
        <TreeItemLayout>
          <slot name="iconBefore">
            <Image20Regular />
          </slot>
          level 1, item 1
          <slot name="iconAfter">
            <LockClosed20Regular />
          </slot>
        </TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout>
              <slot name="iconBefore">
                <Person20Regular />
              </slot>
              icon before
            </TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>
              <slot name="iconBefore">
                <Person20Regular />
              </slot>
              icon before
            </TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch">
        <TreeItemLayout>
          <slot name="iconBefore">
            <Image20Regular />
          </slot>
          <slot name="iconAfter">
            <LockClosed20Regular />
          </slot>
          level 1, item 2
        </TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout>
              <slot name="iconAfter">
                <Warning20Regular />
              </slot>
              icon after
            </TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

IconBeforeAndAfter.parameters = {
  docs: {
    name: 'Icon Before/After',
    description: {
      story: `
\`TreeItemLayout\` component allows you to add icons before or after the content.

> ⚠️ iconBefore and  iconAfter are marked as \`aria-hidden\` by default`,
    },
  },
};

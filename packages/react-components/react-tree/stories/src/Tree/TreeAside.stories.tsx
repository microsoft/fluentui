import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components';
import { CounterBadge } from '@fluentui/react-components';
import { FluentIconsProps, Important16Regular } from '@fluentui/react-icons';

const iconStyleProps: FluentIconsProps = {
  primaryFill: 'red',
};

const AsideContent = ({ isImportant, messageCount }: { isImportant?: boolean; messageCount?: number }) => (
  <>
    {isImportant && <Important16Regular {...iconStyleProps} />}
    {messageCount && messageCount > 0 && <CounterBadge count={messageCount} color="danger" size="small" />}
  </>
);

export const Aside = () => (
  <Tree aria-label="Aside">
    <TreeItem itemType="branch" aria-description="Important, 3 message">
      <TreeItemLayout aside={<AsideContent isImportant={true} messageCount={3} />}>level 1, item 1</TreeItemLayout>
      <Tree>
        <TreeItem itemType="leaf" aria-description="Important">
          <TreeItemLayout aside={<AsideContent isImportant={true} />}>level 2, item 1</TreeItemLayout>
        </TreeItem>
        <TreeItem itemType="leaf" aria-description="2 messages">
          <TreeItemLayout aside={<AsideContent messageCount={2} />}>level 2, item 2</TreeItemLayout>
        </TreeItem>
      </Tree>
    </TreeItem>
    <TreeItem itemType="branch" aria-description="Important, 1 message">
      <TreeItemLayout
        aside={
          <>
            <AsideContent isImportant={true} messageCount={1} />
          </>
        }
      >
        level 1, item 2
      </TreeItemLayout>

      <Tree>
        <TreeItem itemType="branch" aria-description="1 message">
          <TreeItemLayout aside={<AsideContent messageCount={1} />}>level 2, item 1</TreeItemLayout>

          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout aside={<AsideContent />}>level 3, item 1</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </TreeItem>
  </Tree>
);

Aside.parameters = {
  docs: {
    description: {
      story: `
Both tree item layouts supports \`aside\` content that is displayed on the right side of a tree item. It can be used to display additional information, such as a badge with notification count or an icon indicating importance.

> ⚠️ Aside content is \`aria-hidden\` by default
      `,
    },
  },
};

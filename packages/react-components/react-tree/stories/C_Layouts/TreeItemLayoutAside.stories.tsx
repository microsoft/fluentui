import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree';
import { CounterBadge } from '@fluentui/react-components';
import { FluentIconsProps, Important16Regular } from '@fluentui/react-icons';
import story from './TreeItemLayoutAside.md';

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
  <Tree aria-label="Tree">
    <TreeItem
      aside={<AsideContent isImportant={true} messageCount={3} />}
      itemType="branch"
      aria-description="Important, 3 message"
    >
      <TreeItemLayout>level 1, item 1</TreeItemLayout>
      <Tree>
        <TreeItem aside={<AsideContent isImportant={true} />} itemType="leaf" aria-description="Important">
          <TreeItemLayout>level 2, item 1</TreeItemLayout>
        </TreeItem>
        <TreeItem aside={<AsideContent messageCount={2} />} itemType="leaf" aria-description="2 messages">
          <TreeItemLayout>level 2, item 2</TreeItemLayout>
        </TreeItem>
        <TreeItem aside={<AsideContent messageCount={1} />} itemType="leaf" aria-description="1 messages">
          <TreeItemLayout>level 2, item 3</TreeItemLayout>
        </TreeItem>
      </Tree>
    </TreeItem>
    <TreeItem
      aside={
        <>
          <AsideContent isImportant={true} messageCount={1} />
        </>
      }
      itemType="branch"
      aria-description="Important, 1 message"
    >
      <TreeItemLayout>level 1, item 2</TreeItemLayout>

      <Tree>
        <TreeItem aside={<AsideContent messageCount={1} />} itemType="branch" aria-description="1 message">
          <TreeItemLayout>level 2, item 1</TreeItemLayout>

          <Tree>
            <TreeItem aside={<AsideContent />} itemType="leaf">
              <TreeItemLayout>level 3, item 1</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>

        <TreeItem aside={<AsideContent isImportant={true} />} itemType="branch" aria-description="Important">
          <TreeItemLayout>level 2, item 2</TreeItemLayout>

          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 3, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 3, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 3, item 3</TreeItemLayout>
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
      story,
    },
  },
};

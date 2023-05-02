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
    <TreeItem aria-description="Important, 3 message">
      <TreeItemLayout aside={<AsideContent isImportant={true} messageCount={3} />}>level 1, item 1</TreeItemLayout>
      <Tree>
        <TreeItem aria-description="Important">
          <TreeItemLayout aside={<AsideContent isImportant={true} />}>level 2, item 1</TreeItemLayout>
        </TreeItem>
        <TreeItem aria-description="2 messages">
          <TreeItemLayout aside={<AsideContent messageCount={2} />}>level 2, item 2</TreeItemLayout>
        </TreeItem>
        <TreeItem aria-description="1 messages">
          <TreeItemLayout aside={<AsideContent messageCount={1} />}>level 2, item 3</TreeItemLayout>
        </TreeItem>
      </Tree>
    </TreeItem>
    <TreeItem aria-description="Important, 1 message">
      <TreeItemLayout aside={<AsideContent isImportant={true} messageCount={1} />}>level 1, item 2</TreeItemLayout>
      <Tree>
        <TreeItem aria-description="1 message">
          <TreeItemLayout aside={<AsideContent messageCount={1} />}>level 2, item 1</TreeItemLayout>
          <Tree>
            <TreeItem>
              <TreeItemLayout aside={<AsideContent />}>level 3, item 1</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>

        <TreeItem aria-description="Important">
          <TreeItemLayout aside={<AsideContent isImportant={true} />}>level 2, item 2</TreeItemLayout>
          <Tree>
            <TreeItem>
              <TreeItemLayout>level 3, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem>
              <TreeItemLayout>level 3, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem>
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

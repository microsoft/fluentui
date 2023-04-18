import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree';
import { Button, CounterBadge } from '@fluentui/react-components';
import { Edit20Regular, FluentIconsProps, Important16Regular, MoreHorizontal20Regular } from '@fluentui/react-icons';
import story from './TreeItemLayoutAside.md';

const iconStyleProps: FluentIconsProps = {
  primaryFill: 'red',
};

const RenderAside = ({ isImportant, messageCount }: { isImportant?: boolean; messageCount?: number }) => (
  <>
    {isImportant && <Important16Regular {...iconStyleProps} />}
    {messageCount && messageCount > 0 && <CounterBadge count={messageCount} color="danger" size="small" />}
  </>
);

const Actions = () => (
  <>
    <Button appearance="subtle" icon={<Edit20Regular aria-label="Edit" />} />
    <Button appearance="subtle" icon={<MoreHorizontal20Regular aria-label="More options" />} />
  </>
);

export const Aside = () => (
  <Tree aria-label="Tree">
    <TreeItem aria-description="Important, 3 message">
      <TreeItemLayout aside={<RenderAside isImportant={true} messageCount={3} />}>level 1, item 1</TreeItemLayout>
      <Tree>
        <TreeItem aria-description="Important" actions={<Actions />}>
          <TreeItemLayout aside={<RenderAside isImportant={true} />}>level 2, item 1</TreeItemLayout>
        </TreeItem>
        <TreeItem aria-description="2 messages" actions={<Actions />}>
          <TreeItemLayout aside={<RenderAside messageCount={2} />}>level 2, item 2</TreeItemLayout>
        </TreeItem>
        <TreeItem aria-description="1 messages" actions={<Actions />}>
          <TreeItemLayout aside={<RenderAside messageCount={1} />}>level 2, item 3</TreeItemLayout>
        </TreeItem>
      </Tree>
    </TreeItem>
    <TreeItem aria-description="Important, 1 message">
      <TreeItemLayout aside={<RenderAside isImportant={true} messageCount={1} />}>level 1, item 2</TreeItemLayout>
      <Tree>
        <TreeItem aria-description="1 message" actions={<Actions />}>
          <TreeItemLayout aside={<RenderAside messageCount={1} />}>level 2, item 1</TreeItemLayout>
          <Tree>
            <TreeItem actions={<Actions />}>
              <TreeItemLayout aside={<RenderAside />}>level 3, item 1</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>

        <TreeItem aria-description="Important" actions={<Actions />}>
          <TreeItemLayout aside={<RenderAside isImportant={true} />}>level 2, item 2</TreeItemLayout>
          <Tree>
            <TreeItem actions={<Actions />}>
              <TreeItemLayout>level 3, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem actions={<Actions />}>
              <TreeItemLayout>level 3, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem actions={<Actions />}>
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

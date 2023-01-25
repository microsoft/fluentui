import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree';
import { Button, CounterBadge, PresenceBadge } from '@fluentui/react-components';
import { Edit20Regular, MoreHorizontal20Regular } from '@fluentui/react-icons';

const RenderBadges = () => (
  <>
    <PresenceBadge status="do-not-disturb" />
    <CounterBadge count={1} />
  </>
);

const Actions = () => (
  <>
    <Button appearance="subtle" icon={<Edit20Regular />} />
    <Button appearance="subtle" icon={<MoreHorizontal20Regular />} />
  </>
);

export const Badges = () => (
  <Tree aria-label="Tree">
    <TreeItem actions={<Actions />}>
      <TreeItemLayout aside={<RenderBadges />}>level 1, item 1</TreeItemLayout>
      <Tree>
        <TreeItem actions={<Actions />}>
          <TreeItemLayout aside={<RenderBadges />}>level 2, item 1</TreeItemLayout>
        </TreeItem>
        <TreeItem actions={<Actions />}>
          <TreeItemLayout aside={<RenderBadges />}>level 2, item 2</TreeItemLayout>
        </TreeItem>
        <TreeItem actions={<Actions />}>
          <TreeItemLayout aside={<RenderBadges />}>level 2, item 3</TreeItemLayout>
        </TreeItem>
      </Tree>
    </TreeItem>
    <TreeItem actions={<Actions />}>
      <TreeItemLayout aside={<RenderBadges />}>level 1, item 2</TreeItemLayout>
      <Tree>
        <TreeItem actions={<Actions />}>
          <TreeItemLayout aside={<RenderBadges />}>level 2, item 1</TreeItemLayout>
          <Tree>
            <TreeItem actions={<Actions />}>
              <TreeItemLayout aside={<RenderBadges />}>level 3, item 1</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>

        <TreeItem actions={<Actions />}>
          <TreeItemLayout aside={<RenderBadges />}>level 2, item 2</TreeItemLayout>
          <Tree>
            <TreeItem actions={<Actions />}>
              <TreeItemLayout aside={<RenderBadges />}>level 3, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem actions={<Actions />}>
              <TreeItemLayout aside={<RenderBadges />}>level 3, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem actions={<Actions />}>
              <TreeItemLayout aside={<RenderBadges />}>level 3, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </TreeItem>
  </Tree>
);

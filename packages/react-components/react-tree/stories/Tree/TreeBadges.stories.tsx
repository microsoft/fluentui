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
    <TreeItem aria-owns="default-subtree-1" actions={<Actions />}>
      <TreeItemLayout aside={<RenderBadges />}>level 1, item 1 with actions</TreeItemLayout>
    </TreeItem>
    <Tree id="default-subtree-1">
      <TreeItem>
        <TreeItemLayout aside={<RenderBadges />}>level 2, item 1</TreeItemLayout>
      </TreeItem>
      <TreeItem>
        <TreeItemLayout aside={<RenderBadges />}>level 2, item 2</TreeItemLayout>
      </TreeItem>
      <TreeItem>
        <TreeItemLayout aside={<RenderBadges />}>level 2, item 3</TreeItemLayout>
      </TreeItem>
    </Tree>
    <TreeItem aria-owns="default-subtree-2">
      <TreeItemLayout aside={<RenderBadges />}>level 1, item 2</TreeItemLayout>
    </TreeItem>
    <Tree id="default-subtree-2">
      <TreeItem aria-owns="default-subtree-2-1">
        <TreeItemLayout aside={<RenderBadges />}>level 2, item 1</TreeItemLayout>
      </TreeItem>
      <Tree id="default-subtree-2-1">
        <TreeItem>
          <TreeItemLayout aside={<RenderBadges />}>level 3, item 1</TreeItemLayout>
        </TreeItem>
      </Tree>

      <TreeItem aria-owns="default-subtree-3">
        <TreeItemLayout aside={<RenderBadges />}>level 1, item 1</TreeItemLayout>
      </TreeItem>
      <Tree id="default-subtree-3">
        <TreeItem>
          <TreeItemLayout aside={<RenderBadges />}>level 2, item 1</TreeItemLayout>
        </TreeItem>
        <TreeItem>
          <TreeItemLayout aside={<RenderBadges />}>level 2, item 2</TreeItemLayout>
        </TreeItem>
        <TreeItem>
          <TreeItemLayout aside={<RenderBadges />}>level 2, item 3</TreeItemLayout>
        </TreeItem>
      </Tree>
    </Tree>
  </Tree>
);

import * as React from 'react';
import { Tree, TreeItem } from '@fluentui/react-tree';
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
    <TreeItem aria-owns="default-subtree-1" actions={<Actions />} badges={<RenderBadges />}>
      level 1, item 1 with actions
    </TreeItem>
    <Tree id="default-subtree-1">
      <TreeItem badges={<RenderBadges />}>level 2, item 1</TreeItem>
      <TreeItem badges={<RenderBadges />}>level 2, item 2</TreeItem>
      <TreeItem badges={<RenderBadges />}>level 2, item 3</TreeItem>
    </Tree>
    <TreeItem aria-owns="default-subtree-2" badges={<RenderBadges />}>
      level 1, item 2
    </TreeItem>
    <Tree id="default-subtree-2">
      <TreeItem aria-owns="default-subtree-2-1" badges={<RenderBadges />}>
        level 2, item 1
      </TreeItem>
      <Tree id="default-subtree-2-1">
        <TreeItem badges={<RenderBadges />}>level 3, item 1</TreeItem>
      </Tree>

      <TreeItem aria-owns="default-subtree-3" badges={<RenderBadges />}>
        level 1, item 1
      </TreeItem>
      <Tree id="default-subtree-3">
        <TreeItem badges={<RenderBadges />}>level 2, item 1</TreeItem>
        <TreeItem badges={<RenderBadges />}>level 2, item 2</TreeItem>
        <TreeItem badges={<RenderBadges />}>level 2, item 3</TreeItem>
      </Tree>
    </Tree>
  </Tree>
);

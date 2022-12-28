import * as React from 'react';
import { Tree, TreeItem } from '@fluentui/react-tree';
import { Edit20Regular, MoreHorizontal20Regular } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-components';

const RenderActions = () => (
  <>
    <Button appearance="subtle" icon={<Edit20Regular />} />
    <Button appearance="subtle" icon={<MoreHorizontal20Regular />} />
  </>
);

export const Actions = () => (
  <Tree aria-label="Tree">
    <TreeItem aria-owns="default-subtree-1" actions={<RenderActions />}>
      level 1, item 1
    </TreeItem>
    <Tree id="default-subtree-1">
      <TreeItem actions={<RenderActions />}>level 2, item 1</TreeItem>
      <TreeItem actions={<RenderActions />}>level 2, item 2</TreeItem>
      <TreeItem actions={<RenderActions />}>level 2, item 3</TreeItem>
    </Tree>
    <TreeItem aria-owns="default-subtree-2" actions={<RenderActions />}>
      level 1, item 2
    </TreeItem>
    <Tree id="default-subtree-2">
      <TreeItem aria-owns="default-subtree-2-1" actions={<RenderActions />}>
        level 2, item 1
      </TreeItem>
      <Tree id="default-subtree-2-1">
        <TreeItem actions={<RenderActions />}>level 3, item 1</TreeItem>
      </Tree>

      <TreeItem aria-owns="default-subtree-3" actions={<RenderActions />}>
        level 1, item 1
      </TreeItem>
      <Tree id="default-subtree-3">
        <TreeItem actions={<RenderActions />}>level 2, item 1</TreeItem>
        <TreeItem actions={<RenderActions />}>level 2, item 2</TreeItem>
        <TreeItem actions={<RenderActions />}>level 2, item 3</TreeItem>
      </Tree>
    </Tree>
  </Tree>
);

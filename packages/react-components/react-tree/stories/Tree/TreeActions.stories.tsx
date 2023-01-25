import * as React from 'react';
import { Tree, TreeItem } from '@fluentui/react-tree';
import { Edit20Regular, MoreHorizontal20Regular } from '@fluentui/react-icons';
import { Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';

const RenderActions = () => {
  return (
    <>
      <Button appearance="subtle" icon={<Edit20Regular />} />
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Button appearance="subtle" icon={<MoreHorizontal20Regular />} />
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>New </MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <MenuItem>Open Folder</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};

export const Actions = () => (
  <Tree aria-label="Tree">
    <TreeItem actions={<RenderActions />}>
      level 1, item 1
      <Tree>
        <TreeItem actions={<RenderActions />}>level 2, item 1</TreeItem>
        <TreeItem actions={<RenderActions />}>level 2, item 2</TreeItem>
        <TreeItem actions={<RenderActions />}>level 2, item 3</TreeItem>
      </Tree>
    </TreeItem>
    <TreeItem actions={<RenderActions />}>
      level 1, item 2
      <Tree>
        <TreeItem actions={<RenderActions />}>
          level 2, item 1
          <Tree>
            <TreeItem actions={<RenderActions />}>level 3, item 1</TreeItem>
          </Tree>
        </TreeItem>

        <TreeItem actions={<RenderActions />}>
          level 1, item 1
          <Tree>
            <TreeItem actions={<RenderActions />}>level 2, item 1</TreeItem>
            <TreeItem actions={<RenderActions />}>level 2, item 2</TreeItem>
            <TreeItem actions={<RenderActions />}>level 2, item 3</TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </TreeItem>
  </Tree>
);

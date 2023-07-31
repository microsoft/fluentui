import * as React from 'react';
import { Tree, TreeItem, TreeItemContextMenu, TreeItemLayout } from '@fluentui/react-tree';
import { Edit20Regular, MoreHorizontal20Regular } from '@fluentui/react-icons';
import { Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import story from './TreeItemActions.md';

const ActionsExample = () => (
  <>
    <Button aria-label="Edit" appearance="subtle" icon={<Edit20Regular />} />
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button aria-label="More options" appearance="subtle" icon={<MoreHorizontal20Regular />} />
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

const ContextMenuExample = () => (
  <TreeItemContextMenu>
    <MenuPopover>
      <MenuList>
        <MenuItem>Edit </MenuItem>
        <MenuItem>New </MenuItem>
        <MenuItem>New Window</MenuItem>
        <MenuItem disabled>Open File</MenuItem>
        <MenuItem>Open Folder</MenuItem>
      </MenuList>
    </MenuPopover>
  </TreeItemContextMenu>
);

export const Actions = () => {
  return (
    <Tree aria-label="Tree">
      <TreeItem aria-description="has actions" itemType="branch">
        <TreeItemLayout actions={<ActionsExample />}>level 1, item 1</TreeItemLayout>
        <ContextMenuExample />
        <Tree>
          <TreeItem aria-description="has actions" itemType="leaf">
            <TreeItemLayout actions={<ActionsExample />}>level 2, item 1</TreeItemLayout>
            <ContextMenuExample />
          </TreeItem>
          <TreeItem aria-description="has actions" itemType="leaf">
            <TreeItemLayout actions={<ActionsExample />}>level 2, item 2</TreeItemLayout>
            <ContextMenuExample />
          </TreeItem>
          <TreeItem aria-description="has actions" itemType="leaf">
            <TreeItemLayout actions={<ActionsExample />}>level 2, item 3</TreeItemLayout>
            <ContextMenuExample />
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem aria-description="has actions" itemType="branch">
        <TreeItemLayout actions={<ActionsExample />}>level 1, item 2</TreeItemLayout>
        <ContextMenuExample />
        <Tree>
          <TreeItem aria-description="has actions" itemType="branch">
            <TreeItemLayout actions={<ActionsExample />}>level 2, item 1</TreeItemLayout>
            <ContextMenuExample />
            <Tree>
              <TreeItem aria-description="has actions" itemType="leaf">
                <TreeItemLayout actions={<ActionsExample />}>level 3, item 1</TreeItemLayout>
                <ContextMenuExample />
              </TreeItem>
            </Tree>
          </TreeItem>

          <TreeItem aria-description="has actions" itemType="branch">
            <TreeItemLayout actions={<ActionsExample />}>level 1, item 1</TreeItemLayout>
            <ContextMenuExample />
            <Tree>
              <TreeItem aria-description="has actions" itemType="leaf">
                <TreeItemLayout actions={<ActionsExample />}>level 2, item 1</TreeItemLayout>
                <ContextMenuExample />
              </TreeItem>
              <TreeItem aria-description="has actions" itemType="leaf">
                <TreeItemLayout actions={<ActionsExample />}>level 2, item 2</TreeItemLayout>
                <ContextMenuExample />
              </TreeItem>
              <TreeItem aria-description="has actions" itemType="leaf">
                <TreeItemLayout actions={<ActionsExample />}>level 2, item 3</TreeItemLayout>
                <ContextMenuExample />
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

Actions.parameters = {
  docs: {
    description: {
      story,
    },
  },
};

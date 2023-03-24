import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree';
import { Edit20Regular, MoreHorizontal20Regular } from '@fluentui/react-icons';
import { Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import story from './TreeItemActions.md';

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
      <TreeItemLayout>level 1, item 1</TreeItemLayout>
      <Tree>
        <TreeItem actions={<RenderActions />}>
          <TreeItemLayout>level 2, item 1</TreeItemLayout>
        </TreeItem>
        <TreeItem actions={<RenderActions />}>
          <TreeItemLayout>level 2, item 2</TreeItemLayout>
        </TreeItem>
        <TreeItem actions={<RenderActions />}>
          <TreeItemLayout>level 2, item 3</TreeItemLayout>
        </TreeItem>
      </Tree>
    </TreeItem>
    <TreeItem actions={<RenderActions />}>
      <TreeItemLayout>level 1, item 2</TreeItemLayout>
      <Tree>
        <TreeItem actions={<RenderActions />}>
          <TreeItemLayout>level 2, item 1</TreeItemLayout>
          <Tree>
            <TreeItem actions={<RenderActions />}>
              <TreeItemLayout>level 3, item 1</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>

        <TreeItem actions={<RenderActions />}>
          <TreeItemLayout>level 1, item 1</TreeItemLayout>
          <Tree>
            <TreeItem actions={<RenderActions />}>
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem actions={<RenderActions />}>
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem actions={<RenderActions />}>
              <TreeItemLayout>level 2, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </TreeItem>
  </Tree>
);

Actions.parameters = {
  docs: {
    description: {
      story,
    },
  },
};

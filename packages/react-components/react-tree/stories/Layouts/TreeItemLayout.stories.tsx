import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-tree';
import {
  CalendarLtr20Regular,
  Flag20Regular,
  FluentIconsProps,
  Important16Regular,
  LockClosed20Regular,
  MoreHorizontal20Regular,
  SquareMultiple20Regular,
} from '@fluentui/react-icons';
import { Button, CounterBadge, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import story from './TreeItemLayout.md';

const iconStyleProps: FluentIconsProps = {
  primaryFill: 'red',
};

const Badges = () => (
  <>
    <Important16Regular {...iconStyleProps} />
    <CounterBadge count={1} color="danger" size="small" />
  </>
);

const RenderIconsAfter = () => (
  <>
    <LockClosed20Regular />
    <SquareMultiple20Regular />
  </>
);

const Actions = () => (
  <>
    <Button appearance="subtle" icon={<Flag20Regular />} />
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

const treeItemLayoutProps = {
  iconBefore: <CalendarLtr20Regular />,
  iconAfter: <RenderIconsAfter />,
};

export const Layout = () => {
  return (
    <Tree aria-label="Tree">
      <TreeItem actions={<Actions />}>
        <TreeItemLayout {...treeItemLayoutProps} aside={<Badges />}>
          Content
        </TreeItemLayout>
        <Tree>
          <TreeItem actions={<Actions />}>
            <TreeItemLayout>Tree Item</TreeItemLayout>
            <Tree>
              <TreeItem>
                <TreeItemLayout>level 2, item 1</TreeItemLayout>
              </TreeItem>
              <TreeItem>
                <TreeItemLayout>level 2, item 2</TreeItemLayout>
              </TreeItem>
              <TreeItem>
                <TreeItemLayout>level 2, item 3</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
          <TreeItem>
            <TreeItemLayout>level 2, item 2</TreeItemLayout>
          </TreeItem>
          <TreeItem>
            <TreeItemLayout>level 2, item 3</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem actions={<Actions />}>
        <TreeItemLayout {...treeItemLayoutProps} aside={<Important16Regular {...iconStyleProps} />}>
          Content
        </TreeItemLayout>
        <Tree>
          <TreeItem actions={<Actions />}>
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem>
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

Layout.parameters = {
  docs: {
    description: {
      story,
    },
  },
};

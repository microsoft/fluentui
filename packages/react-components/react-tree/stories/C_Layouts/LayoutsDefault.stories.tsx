import * as React from 'react';
import { Tree, TreeItem, TreeItemAside, TreeItemLayout, TreeItemPersonaLayout } from '@fluentui/react-tree';
import {
  CalendarMonthRegular,
  LockClosedRegular,
  LinkSquareRegular,
  Important16Regular,
  MoreHorizontal20Regular,
  FlagRegular,
} from '@fluentui/react-icons';
import {
  Avatar,
  Button,
  CounterBadge,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text,
  tokens,
} from '@fluentui/react-components';

export const Default = () => {
  return (
    <Tree aria-label="Tree">
      <TreeItem itemType="branch">
        <TreeItemLayout
          iconBefore={<CalendarMonthRegular />}
          iconAfter={
            <>
              <LockClosedRegular />
              <LinkSquareRegular />
            </>
          }
        >
          Content
        </TreeItemLayout>
        <TreeItemAside>
          <Important16Regular primaryFill="red" />
          <CounterBadge count={1} color="danger" size="small" />
        </TreeItemAside>
        <TreeItemAside actions>
          <Button aria-label="Edit" appearance="subtle" icon={<FlagRegular />} />
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
        </TreeItemAside>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 2</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 3</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch">
        <TreeItemLayout
          iconBefore={<CalendarMonthRegular />}
          iconAfter={
            <>
              <LockClosedRegular />
              <LinkSquareRegular />
            </>
          }
        >
          Content
        </TreeItemLayout>
        <TreeItemAside actions>
          <Button aria-label="Edit" appearance="subtle" icon={<FlagRegular />} />
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
        </TreeItemAside>
        <Tree>
          <TreeItem itemType="branch">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="leaf">
        <TreeItemPersonaLayout description="description" media={<Avatar />}>
          Content
        </TreeItemPersonaLayout>
        <TreeItemAside style={{ flexDirection: 'column' }}>
          <Text font="numeric" as="span" style={{ whiteSpace: 'nowrap' }}>
            00:00 AM
          </Text>
          <div style={{ display: 'flex', marginLeft: 'auto', gap: tokens.spacingHorizontalXS }}>
            <Important16Regular primaryFill="red" />
            <CounterBadge count={1} color="danger" size="small" />
          </div>
        </TreeItemAside>
        <Tree>
          <TreeItem itemType="branch">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch">
        <TreeItemPersonaLayout media={<Avatar shape="square" />}>Content</TreeItemPersonaLayout>
        <TreeItemAside>
          <Important16Regular primaryFill="red" />
          <CounterBadge count={1} color="danger" size="small" />
        </TreeItemAside>
        <Tree>
          <TreeItem itemType="branch">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

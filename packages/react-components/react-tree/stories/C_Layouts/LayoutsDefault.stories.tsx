import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout, TreeItemPersonaLayout } from '@fluentui/react-tree';
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
          aside={
            <>
              <Important16Regular primaryFill="red" />
              <CounterBadge count={1} color="danger" size="small" />
            </>
          }
          actions={{
            visible: true,
            children: (
              <>
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
              </>
            ),
          }}
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
          actions={
            <>
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
            </>
          }
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
        <TreeItemPersonaLayout
          aside={{
            style: { flexDirection: 'column' },
            children: (
              <>
                <Text font="numeric" as="span" style={{ whiteSpace: 'nowrap' }}>
                  00:00 AM
                </Text>
                <div style={{ display: 'flex', marginLeft: 'auto', gap: tokens.spacingHorizontalXS }}>
                  <Important16Regular primaryFill="red" />
                  <CounterBadge count={1} color="danger" size="small" />
                </div>
              </>
            ),
          }}
          description="description"
          media={<Avatar />}
        >
          Content
        </TreeItemPersonaLayout>
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
        <TreeItemPersonaLayout
          aside={
            <>
              <Important16Regular primaryFill="red" />
              <CounterBadge count={1} color="danger" size="small" />
            </>
          }
          media={<Avatar shape="square" />}
        >
          Content
        </TreeItemPersonaLayout>
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

import * as React from 'react';
import {
  Avatar,
  Button,
  CounterBadge,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  PresenceBadge,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import { Tree, TreeItem, TreeItemLayout, TreeItemPersonaLayout } from '@fluentui/react-tree';
import { Edit20Regular, MoreHorizontal20Regular } from '@fluentui/react-icons';

const useBadgeStyles = makeStyles({
  base: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    ...shorthands.padding(0, tokens.spacingHorizontalXS),
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
});

const Badges = () => {
  const badgeStyles = useBadgeStyles();
  return (
    <div aria-hidden className={badgeStyles.base}>
      <PresenceBadge status="do-not-disturb" />
      <CounterBadge count={1} />
    </div>
  );
};

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

export const Default = () => {
  return (
    <Tree aria-label="Tree">
      <TreeItem expandIcon={'•'} aria-owns="default-subtree-1" actions={<RenderActions />}>
        <TreeItemPersonaLayout
          description="description"
          aside={
            <>
              <span>00:00 AM</span>
              <Badges />
            </>
          }
          media={<Avatar />}
        >
          content
        </TreeItemPersonaLayout>
      </TreeItem>
      <Tree id="default-subtree-1">
        <TreeItem>
          <TreeItemLayout>content</TreeItemLayout>
        </TreeItem>
        <TreeItem>
          <TreeItemPersonaLayout media={<Avatar shape="square" />}>content</TreeItemPersonaLayout>
        </TreeItem>
        <TreeItem>
          <TreeItemPersonaLayout description="description" media={<Avatar />}>
            content
          </TreeItemPersonaLayout>
        </TreeItem>
        <TreeItem>
          <TreeItemPersonaLayout description="description" media={<Avatar />}>
            content
          </TreeItemPersonaLayout>
        </TreeItem>
      </Tree>
      <TreeItem aria-owns="default-subtree-2">
        <TreeItemPersonaLayout description="description" media={<Avatar />}>
          content
        </TreeItemPersonaLayout>
      </TreeItem>
      <Tree id="default-subtree-2">
        <TreeItem aria-owns="default-subtree-2-1">
          <TreeItemPersonaLayout description="description" media={<Avatar />}>
            content
          </TreeItemPersonaLayout>
        </TreeItem>
        <Tree id="default-subtree-2-1">
          <TreeItem>
            <TreeItemPersonaLayout description="description" media={<Avatar />}>
              content
            </TreeItemPersonaLayout>
          </TreeItem>
        </Tree>
      </Tree>
    </Tree>
  );
};

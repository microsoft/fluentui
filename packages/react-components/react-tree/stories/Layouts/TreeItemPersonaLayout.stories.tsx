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
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import { Tree, TreeItem, TreeItemPersonaLayout } from '@fluentui/react-tree';
import { Flag20Regular, FluentIconsProps, Important16Regular, MoreHorizontal20Regular } from '@fluentui/react-icons';
import story from './TreeItemPersonaLayout.md';

const useBadgeStyles = makeStyles({
  base: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    ...shorthands.padding(0, tokens.spacingHorizontalXS),
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
});

const useStyles = makeStyles({
  unread: {
    fontWeight: 'bold',
  },
});

const iconStyleProps: FluentIconsProps = {
  primaryFill: 'red',
};

const Badges = () => {
  const badgeStyles = useBadgeStyles();
  return (
    <div aria-hidden className={badgeStyles.base}>
      <Important16Regular {...iconStyleProps} />
      <CounterBadge count={1} color="danger" size="small" />
    </div>
  );
};

const RenderActions = () => {
  return (
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
};

export const TreePersonaLayout = () => {
  const styles = useStyles();

  return (
    <Tree aria-label="Tree">
      <TreeItem actions={<RenderActions />}>
        <TreeItemPersonaLayout
          description="Secondary text slot"
          aside={
            <>
              <span>00:00 AM</span>
              <Badges />
            </>
          }
          media={<Avatar />}
        >
          Primary text slot
        </TreeItemPersonaLayout>
        <Tree>
          <TreeItem>
            <TreeItemPersonaLayout media={<Avatar />}>content</TreeItemPersonaLayout>
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
      </TreeItem>
      <TreeItem actions={<RenderActions />}>
        <TreeItemPersonaLayout
          description={<div className={styles.unread}>Secondary text slot</div>}
          aside={
            <>
              <span>00:00 AM</span>
              <Badges />
            </>
          }
          media={<Avatar />}
        >
          <div className={styles.unread}>Primary text slot</div>
        </TreeItemPersonaLayout>
        <Tree>
          <TreeItem>
            <TreeItemPersonaLayout description="description" media={<Avatar />}>
              content
            </TreeItemPersonaLayout>
            <Tree>
              <TreeItem>
                <TreeItemPersonaLayout description="description" media={<Avatar />}>
                  content
                </TreeItemPersonaLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

TreePersonaLayout.parameters = {
  docs: {
    description: {
      story,
    },
  },
};

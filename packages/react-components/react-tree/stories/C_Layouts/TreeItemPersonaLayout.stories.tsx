import * as React from 'react';
import { Avatar, CounterBadge, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { Tree, TreeItem, TreeItemPersonaLayout } from '@fluentui/react-tree';
import { Important16Regular } from '@fluentui/react-icons';
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

const Badges = () => {
  const badgeStyles = useBadgeStyles();
  return (
    <div className={badgeStyles.base}>
      <Important16Regular primaryFill="red" />
      <CounterBadge count={1} color="danger" size="small" />
    </div>
  );
};

export const Layout = () => {
  return (
    <Tree aria-label="Tree">
      <TreeItem aria-description="1 new message, important">
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
      <TreeItem aria-description="1 message, important">
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

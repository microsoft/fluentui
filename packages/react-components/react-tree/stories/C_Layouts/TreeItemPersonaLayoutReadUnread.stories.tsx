import * as React from 'react';
import { Avatar, makeStyles, tokens } from '@fluentui/react-components';
import { Tree, TreeItem, TreeItemPersonaLayout } from '@fluentui/react-tree';
import story from './TreeItemPersonaLayoutReadUnread.md';

const useStyles = makeStyles({
  unread: {
    fontWeight: tokens.fontWeightBold,
  },
});

export const ReadUnread = () => {
  const styles = useStyles();

  return (
    <Tree aria-label="Tree">
      <TreeItem expandIcon="" itemType="leaf">
        <TreeItemPersonaLayout description="Secondary text content" media={<Avatar />}>
          Read content message
        </TreeItemPersonaLayout>
      </TreeItem>
      <TreeItem expandIcon="•" itemType="leaf" aria-description="New message">
        <TreeItemPersonaLayout
          description={{ className: styles.unread, children: 'Secondary text content' }}
          className={styles.unread}
          media={<Avatar />}
        >
          Unread content message
        </TreeItemPersonaLayout>
      </TreeItem>
    </Tree>
  );
};

ReadUnread.parameters = {
  docs: {
    description: {
      story,
    },
  },
};

import * as React from 'react';
import { Avatar, makeStyles, tokens } from '@fluentui/react-components';
import { Tree, TreeItem, TreeItemPersonaLayout } from '@fluentui/react-tree';
import story from './TreeItemPersonaLayoutReadUnread.md';

const useStyles = makeStyles({
  unread: {
    fontWeight: tokens.fontWeightSemibold,
  },
});

export const ReadUnread = () => {
  const styles = useStyles();

  return (
    <Tree aria-label="Tree">
      <TreeItem>
        <TreeItemPersonaLayout description="Secondary text content" media={<Avatar />}>
          Read content message
        </TreeItemPersonaLayout>
      </TreeItem>
      <TreeItem>
        <TreeItemPersonaLayout
          description={<div className={styles.unread}>Secondary text content</div>}
          media={<Avatar />}
        >
          <div className={styles.unread}>Unread content message</div>
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

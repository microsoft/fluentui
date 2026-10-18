import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-headless-components-preview/tree';
import { ChevronRightRegular, DeleteRegular, EditRegular } from '@fluentui/react-icons';

import styles from './tree.module.css';

const inboxes = [
  { value: 'inbox', name: 'Inbox', unread: 12, children: ['Receipts', 'Travel'] },
  { value: 'archive', name: 'Archive', unread: 0, children: ['2025', '2026'] },
];

const ItemActions = ({ name }: { name: string }) => (
  <>
    <button className={styles.action} aria-label={`Rename ${name}`}>
      <EditRegular />
    </button>
    <button className={styles.action} aria-label={`Delete ${name}`}>
      <DeleteRegular />
    </button>
  </>
);

/**
 * In `treegrid` navigation mode, <kbd>ArrowRight</kbd> moves focus into the actions of the focused
 * item and <kbd>ArrowLeft</kbd> moves it back. Actions replace the aside content while the item is
 * hovered or focused.
 */
export const WithActions = (): React.ReactNode => (
  <Tree aria-label="Mail folders" className={styles.tree} navigationMode="treegrid" defaultOpenItems={['inbox']}>
    {inboxes.map(inbox => (
      <TreeItem className={styles.item} key={inbox.value} value={inbox.value} itemType="branch">
        <TreeItemLayout
          className={styles.layout}
          expandIcon={{ className: styles.expandIcon, children: <ChevronRightRegular /> }}
          main={{ className: styles.main }}
          aside={inbox.unread ? { className: styles.aside, children: inbox.unread } : undefined}
          actions={{ className: styles.actions, children: <ItemActions name={inbox.name} /> }}
        >
          {inbox.name}
        </TreeItemLayout>
        <Tree className={styles.subtree}>
          {inbox.children.map(child => (
            <TreeItem className={styles.item} key={child} value={`${inbox.value}/${child}`} itemType="leaf">
              <TreeItemLayout
                className={styles.layout}
                main={{ className: styles.main }}
                actions={{ className: styles.actions, children: <ItemActions name={child} /> }}
              >
                {child}
              </TreeItemLayout>
            </TreeItem>
          ))}
        </Tree>
      </TreeItem>
    ))}
  </Tree>
);

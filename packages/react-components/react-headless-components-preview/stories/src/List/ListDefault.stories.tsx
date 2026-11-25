import * as React from 'react';
import { List, ListItem } from '@fluentui/react-headless-components-preview/list';

import styles from './list.module.css';

const items = [
  { value: 'inbox', title: 'Inbox', description: '12 unread conversations' },
  { value: 'drafts', title: 'Drafts', description: '3 messages waiting to be sent' },
  { value: 'archive', title: 'Archive', description: 'Everything you have filed away' },
];

export const Default = (): React.ReactNode => (
  <List aria-label="Mail folders" className={styles.list}>
    {items.map(item => (
      <ListItem className={styles.item} key={item.value} value={item.value}>
        <span className={styles.label}>
          <span className={styles.title}>{item.title}</span>
          <span className={styles.description}>{item.description}</span>
        </span>
      </ListItem>
    ))}
  </List>
);

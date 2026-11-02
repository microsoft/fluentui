import * as React from 'react';
import { List, ListItem } from '@fluentui/react-headless-components-preview/list';

import styles from './list.module.css';

export const SecondaryContentRight = (): React.ReactNode => {
  const items = [
    ['Design review', 'Today'],
    ['Project files', '12 items'],
    ['Release notes', 'Draft'],
    ['Support queue', 'Open'],
  ];

  return (
    <List aria-label="Projects" className={styles.list} navigationMode="items">
      {items.map(([title, secondary]) => (
        <ListItem className={styles.item} key={title} value={title}>
          <span className={styles.title}>{title}</span>
          <span className={styles.secondaryRight}>{secondary}</span>
        </ListItem>
      ))}
    </List>
  );
};

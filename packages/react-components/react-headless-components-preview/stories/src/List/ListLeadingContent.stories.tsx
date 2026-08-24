import * as React from 'react';
import { List, ListItem } from '@fluentui/react-headless-components-preview/list';
import { PersonRegular } from '@fluentui/react-icons';

import styles from './list.module.css';

export const LeadingContent = (): React.ReactNode => {
  const items = [
    { title: 'Plain item' },
    { title: 'Text only' },
    { title: 'Icon item', icon: true },
    { title: 'Icon row', icon: true },
    { title: 'Avatar item', avatar: true },
    { title: 'Avatar row', avatar: true },
  ];

  return (
    <List aria-label="Leading content examples" className={styles.list} navigationMode="items">
      {items.map(item => (
        <ListItem className={styles.item} key={item.title} value={item.title}>
          {item.icon && <PersonRegular aria-hidden className={styles.leadingIcon} />}
          {item.avatar && <span className={styles.avatar}>MK</span>}
          <span className={styles.title}>{item.title}</span>
        </ListItem>
      ))}
    </List>
  );
};

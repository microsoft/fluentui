import * as React from 'react';
import { List, ListItem } from '@fluentui/react-headless-components-preview/list';

import styles from './list.module.css';

export const SecondaryContentUnder = (): React.ReactNode => (
  <List aria-label="People and email addresses" className={styles.list} navigationMode="items">
    {['Mona Kane', 'Allan Munger', 'Robin Counts', 'Nestor Wilke'].map(person => (
      <ListItem className={styles.item} key={person} value={person}>
        <span aria-hidden className={styles.avatar}>
          {person
            .split(' ')
            .map(part => part[0])
            .join('')}
        </span>
        <span className={styles.label}>
          <span className={styles.title}>{person}</span>
          <span className={styles.description}>{person.toLowerCase().replace(' ', '.')}@example.com</span>
        </span>
      </ListItem>
    ))}
  </List>
);

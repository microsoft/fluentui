import * as React from 'react';
import { List, ListItem } from '@fluentui/react-headless-components-preview/list';
import { PersonRegular } from '@fluentui/react-icons';

import styles from './list.module.css';

export const SingleSelection = (): React.ReactNode => (
  <List
    aria-label="Choose a person"
    className={styles.list}
    selectionMode="single"
    defaultSelectedItems={['Mona Kane']}
  >
    {['Alex Wilber', 'Mona Kane', 'Allan Munger', 'Robin Counts'].map(person => (
      <ListItem className={styles.item} key={person} value={person} checkmark={{ className: styles.checkmark }}>
        <PersonRegular aria-hidden className={styles.leadingIcon} />
        <span className={styles.title}>{person}</span>
      </ListItem>
    ))}
  </List>
);

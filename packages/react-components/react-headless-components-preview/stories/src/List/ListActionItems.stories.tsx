import * as React from 'react';
import { List, ListItem } from '@fluentui/react-headless-components-preview/list';
import { EditRegular, MoreHorizontalRegular, PersonRegular } from '@fluentui/react-icons';

import styles from './list.module.css';

export const ActionItems = (): React.ReactNode => (
  <List aria-label="People actions" className={styles.list} navigationMode="composite">
    {['Alex Wilber', 'Mona Kane', 'Allan Munger', 'Robin Counts'].map(person => (
      <ListItem className={styles.item} key={person} value={person}>
        <PersonRegular aria-hidden className={styles.leadingIcon} />
        <span className={styles.title} role="gridcell">
          {person}
        </span>
        <span className={styles.actions} role="gridcell">
          <button className={styles.action} type="button" aria-label={`Edit ${person}`}>
            <EditRegular aria-hidden />
          </button>
          <button className={styles.action} type="button" aria-label={`More options for ${person}`}>
            <MoreHorizontalRegular aria-hidden />
          </button>
        </span>
      </ListItem>
    ))}
  </List>
);

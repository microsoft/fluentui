import * as React from 'react';
import { List, ListItem } from '@fluentui/react-headless-components-preview/list';

import styles from './list.module.css';

const items = [
  { value: 'design', title: 'Design review', description: 'Owned by the design system team' },
  { value: 'a11y', title: 'Accessibility audit', description: 'Blocked until the spec lands' },
  { value: 'perf', title: 'Performance budget', description: 'Locked by the release train', disabled: true },
];

export const Multiselect = (): React.ReactNode => {
  const [selectedItems, setSelectedItems] = React.useState<Array<string | number>>(['design']);

  return (
    <>
      <List
        aria-label="Release checklist"
        className={styles.list}
        selectionMode="multiselect"
        selectedItems={selectedItems}
        onSelectionChange={(_, data) => setSelectedItems(data.selectedItems)}
      >
        {items.map(item => (
          <ListItem
            className={styles.item}
            key={item.value}
            value={item.value}
            disabledSelection={item.disabled}
            checkmark={{ className: styles.checkmark }}
          >
            <span className={styles.label}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.description}>{item.description}</span>
            </span>
          </ListItem>
        ))}
      </List>
      <p className={styles.description}>Selected: {selectedItems.join(', ') || 'nothing'}</p>
    </>
  );
};

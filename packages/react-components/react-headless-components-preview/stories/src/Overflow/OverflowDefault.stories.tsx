import * as React from 'react';
import { Overflow, OverflowItem } from '@fluentui/react-headless-components-preview/overflow';

import { OverflowMenu } from './OverflowMenu';
import styles from './overflow.module.css';

const itemIds = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

/**
 * Drag the dashed box's right edge to resize. Items that no longer fit are hidden and the `+N`
 * button reflects the overflow count; click it to see the overflowed items.
 */
export const Default = (): React.ReactNode => (
  <div className={styles.resizer}>
    <Overflow>
      <div className={styles.container}>
        {itemIds.map(id => (
          <OverflowItem key={id} id={id}>
            <button className={styles.item}>Item {id}</button>
          </OverflowItem>
        ))}
        <OverflowMenu ids={itemIds} />
      </div>
    </Overflow>
  </div>
);

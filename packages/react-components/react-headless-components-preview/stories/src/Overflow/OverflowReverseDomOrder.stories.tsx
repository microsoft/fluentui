import * as React from 'react';
import { Overflow, OverflowItem } from '@fluentui/react-headless-components-preview/overflow';

import { OverflowMenu } from './OverflowMenu';
import styles from './overflow.module.css';

const itemIds = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

/**
 * Overflow can happen in reverse DOM order via `overflowDirection="start"` — here the menu is the
 * first child and items overflow from the start of the container.
 */
export const ReverseDomOrder = (): React.ReactNode => (
  <div className={styles.resizer}>
    <Overflow overflowDirection="start">
      <div className={styles.container}>
        <OverflowMenu ids={itemIds} />
        {itemIds.map(id => (
          <OverflowItem key={id} id={id}>
            <button className={styles.item}>Item {id}</button>
          </OverflowItem>
        ))}
      </div>
    </Overflow>
  </div>
);

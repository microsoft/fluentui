import * as React from 'react';
import { Overflow, OverflowItem } from '@fluentui/react-headless-components-preview/overflow';

import { OverflowMenu } from './OverflowMenu';
import styles from './overflow.module.css';

const itemIds = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

/**
 * Use the `overflowAxis` prop to switch orientation. Drag the dashed box's bottom edge to resize.
 */
export const Vertical = (): React.ReactNode => (
  <div className={styles.resizerVertical}>
    <Overflow overflowAxis="vertical">
      <div className={`${styles.container} ${styles.vertical}`}>
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

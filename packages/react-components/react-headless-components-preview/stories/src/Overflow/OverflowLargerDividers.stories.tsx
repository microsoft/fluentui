import * as React from 'react';
import { Overflow, OverflowItem, OverflowDivider } from '@fluentui/react-headless-components-preview/overflow';

import { OverflowMenu } from './OverflowMenu';
import styles from './overflow.module.css';

const GroupDivider: React.FC<{ groupId: string }> = ({ groupId }) => (
  <OverflowDivider groupId={groupId}>
    <div className={styles.divider} />
  </OverflowDivider>
);

const menuIds = ['1', 'divider-1', '2', 'divider-2', '3', '4', 'divider-3', '5', '6', '7', 'divider-4', '8'];

/**
 * `OverflowDivider` registers a divider with a `groupId` so its width is included in the overflow
 * calculation. Group dividers are hidden (and rendered in the menu) once their group overflows.
 */
export const LargerDividers = (): React.ReactNode => (
  <div className={styles.resizer}>
    <Overflow>
      <div className={styles.container}>
        <OverflowItem id="1" groupId="1">
          <button className={styles.item}>Item 1</button>
        </OverflowItem>
        <GroupDivider groupId="1" />
        <OverflowItem id="2" groupId="2">
          <button className={styles.item}>Item 2</button>
        </OverflowItem>
        <GroupDivider groupId="2" />
        <OverflowItem id="3" groupId="3">
          <button className={styles.item}>Item 3</button>
        </OverflowItem>
        <OverflowItem id="4" groupId="3">
          <button className={styles.item}>Item 4</button>
        </OverflowItem>
        <GroupDivider groupId="3" />
        <OverflowItem id="5" groupId="4">
          <button className={styles.item}>Item 5</button>
        </OverflowItem>
        <OverflowItem id="6" groupId="4">
          <button className={styles.item}>Item 6</button>
        </OverflowItem>
        <OverflowItem id="7" groupId="4">
          <button className={styles.item}>Item 7</button>
        </OverflowItem>
        <GroupDivider groupId="4" />
        <OverflowItem id="8" groupId="5">
          <button className={styles.item}>Item 8</button>
        </OverflowItem>
        <OverflowMenu ids={menuIds} />
      </div>
    </Overflow>
  </div>
);

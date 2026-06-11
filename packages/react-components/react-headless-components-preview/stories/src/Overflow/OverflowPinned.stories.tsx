import * as React from 'react';
import { Overflow, OverflowItem } from '@fluentui/react-headless-components-preview/overflow';

import { OverflowMenu } from './OverflowMenu';
import styles from './overflow.module.css';

const itemIds = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

/**
 * An item can be pinned (always visible, never overflows) via the `pinned` prop on `OverflowItem` —
 * useful for selection scenarios. Click items (or menu entries) to toggle their pinned state.
 */
export const Pinned = (): React.ReactNode => {
  const [selected, setSelected] = React.useState<ReadonlySet<string>>(() => new Set(['6']));

  const toggle = (id: string) =>
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  return (
    <div className={styles.resizer}>
      <Overflow>
        <div className={styles.container}>
          {itemIds.map(id => (
            <OverflowItem key={id} id={id} pinned={selected.has(id)}>
              <button
                className={`${styles.item}${selected.has(id) ? ` ${styles.itemSelected}` : ''}`}
                aria-pressed={selected.has(id)}
                onClick={() => toggle(id)}
              >
                Item {id}
              </button>
            </OverflowItem>
          ))}
          <OverflowMenu ids={itemIds} onItemClick={toggle} />
        </div>
      </Overflow>
    </div>
  );
};

import * as React from 'react';
import {
  Overflow,
  OverflowItem,
  useOverflowMenu,
  useIsOverflowItemVisible,
} from '@fluentui/react-headless-components-preview/overflow';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';

import styles from './overflow.module.css';

const itemIds = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

const OverflowMenuItem = ({ id, onClick }: { id: string; onClick: () => void }): React.ReactElement | null => {
  // Only the overflowed (hidden) items are listed in the menu.
  const isVisible = useIsOverflowItemVisible(id);
  return isVisible ? null : (
    <MenuItem className={styles.menuItem} onClick={onClick}>
      Item {id}
    </MenuItem>
  );
};

/**
 * `+N` button that opens a headless `Menu` listing the overflowed items. `MenuPopover` renders
 * through a portal but preserves React context, so the overflow hooks inside still read the
 * `Overflow` root's context.
 */
const OverflowMenu = ({
  ids,
  onItemClick,
}: {
  ids: string[];
  onItemClick: (id: string) => void;
}): React.ReactElement | null => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>();

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu>
      <MenuTrigger>
        <button ref={ref} type="button" className={styles.menu} aria-label={`${overflowCount} more items`}>
          +{overflowCount}
        </button>
      </MenuTrigger>
      <MenuPopover className={styles.menuPopover}>
        <MenuList className={styles.menuList}>
          {ids.map(id => (
            <OverflowMenuItem key={id} id={id} onClick={() => onItemClick(id)} />
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

/**
 * An item can be pinned (always visible, never overflows) via the `pinned` prop on `OverflowItem` —
 * useful for selection scenarios. Click items (or menu entries) to toggle their pinned state.
 */
export const Pinned = (): React.ReactElement => {
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

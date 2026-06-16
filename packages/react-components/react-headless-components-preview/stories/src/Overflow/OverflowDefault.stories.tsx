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

const OverflowMenuItem = ({ id }: { id: string }): React.ReactNode => {
  // Only the overflowed (hidden) items are listed in the menu.
  const isVisible = useIsOverflowItemVisible(id);
  return isVisible ? null : <MenuItem className={styles.menuItem}>Item {id}</MenuItem>;
};

/**
 * `+N` button that opens a headless `Menu` listing the overflowed items. `MenuPopover` renders
 * through a portal but preserves React context, so the overflow hooks inside still read the
 * `Overflow` root's context.
 */
const OverflowMenu = ({ ids }: { ids: string[] }): React.ReactNode => {
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
            <OverflowMenuItem key={id} id={id} />
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

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

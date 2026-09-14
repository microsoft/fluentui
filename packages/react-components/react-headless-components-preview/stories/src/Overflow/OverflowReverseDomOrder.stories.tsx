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

const OverflowMenuItem = ({ id }: { id: string }): React.ReactElement | null => {
  // Only the overflowed (hidden) items are listed in the menu.
  const isVisible = useIsOverflowItemVisible(id);
  return isVisible ? null : <MenuItem className={styles.menuItem}>Item {id}</MenuItem>;
};

/**
 * `+N` button that opens a headless `Menu` listing the overflowed items. `MenuPopover` renders
 * through a portal but preserves React context, so the overflow hooks inside still read the
 * `Overflow` root's context.
 */
const OverflowMenu = ({ ids }: { ids: string[] }): React.ReactElement | null => {
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
 * Overflow can happen in reverse DOM order via `overflowDirection="start"` — here the menu is the
 * first child and items overflow from the start of the container.
 */
export const ReverseDomOrder = (): React.ReactElement => (
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

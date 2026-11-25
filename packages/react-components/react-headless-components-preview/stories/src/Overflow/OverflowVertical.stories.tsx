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
 * Use the `overflowAxis` prop to switch orientation. Drag the dashed box's bottom edge to resize.
 */
export const Vertical = (): React.ReactElement => (
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

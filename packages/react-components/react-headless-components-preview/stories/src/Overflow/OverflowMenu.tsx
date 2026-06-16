/* eslint-disable import/no-extraneous-dependencies -- story-support module; deps are provided by the stories build */
'use client';

import * as React from 'react';
import {
  useOverflowMenu,
  useIsOverflowItemVisible,
  useIsOverflowGroupVisible,
} from '@fluentui/react-headless-components-preview/overflow';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@fluentui/react-headless-components-preview/menu';

import styles from './overflow.module.css';

export const OverflowMenuItem: React.FC<{ id: string; onClick?: () => void }> = ({ id, onClick }) => {
  // Only the overflowed (hidden) items are listed in the menu.
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  return (
    <MenuItem className={styles.menuItem} onClick={onClick}>
      Item {id}
    </MenuItem>
  );
};

export const OverflowMenuDivider: React.FC<{ groupId: string }> = ({ groupId }) => {
  const groupVisibility = useIsOverflowGroupVisible(groupId);

  if (groupVisibility === 'visible') {
    return null;
  }

  return <MenuDivider className={styles.menuDivider} />;
};

/**
 * Renders a `+N` button that opens a menu listing the overflowed items. Mirrors the styled
 * Overflow's overflow menu, but built from the headless `Menu` — which provides the correct
 * `menu`/`menuitem` semantics and keyboard navigation — and the headless overflow hooks, with no
 * Griffel. Entries in `ids` prefixed with `divider-` render a group divider (when that group is
 * overflowing).
 *
 * `MenuPopover` renders through a portal but preserves React context, so the overflow hooks inside
 * still read the `Overflow` root's context.
 */
export const OverflowMenu: React.FC<{ ids: string[]; onItemClick?: (id: string) => void }> = ({ ids, onItemClick }) => {
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
          {ids.map(id =>
            id.startsWith('divider-') ? (
              <OverflowMenuDivider key={id} groupId={id.slice('divider-'.length)} />
            ) : (
              <OverflowMenuItem key={id} id={id} onClick={onItemClick && (() => onItemClick(id))} />
            ),
          )}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

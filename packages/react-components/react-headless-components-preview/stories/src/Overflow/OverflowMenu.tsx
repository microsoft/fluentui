/* eslint-disable import/no-extraneous-dependencies -- story-support module; deps are provided by the stories build */
'use client';

import * as React from 'react';
import {
  useOverflowMenu,
  useIsOverflowItemVisible,
  useIsOverflowGroupVisible,
} from '@fluentui/react-headless-components-preview/overflow';

import styles from './overflow.module.css';

export const OverflowMenuItem: React.FC<{ id: string; onClick?: () => void }> = ({ id, onClick }) => {
  // Only the overflowed (hidden) items are listed in the menu.
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  return (
    <button type="button" role="menuitem" className={styles.menuItem} onClick={onClick}>
      Item {id}
    </button>
  );
};

export const OverflowMenuDivider: React.FC<{ groupId: string }> = ({ groupId }) => {
  const groupVisibility = useIsOverflowGroupVisible(groupId);

  if (groupVisibility === 'visible') {
    return null;
  }

  return <div role="separator" className={styles.menuDivider} />;
};

/**
 * Renders a `+N` button that opens a popover listing the overflowed items. Mirrors the styled
 * Overflow's overflow menu, but built from the headless hooks with no Griffel. Entries in `ids`
 * prefixed with `divider-` render a group divider (when that group is overflowing).
 *
 * The popover uses `position: fixed` so it isn't clipped by the resizable container's `overflow`.
 */
export const OverflowMenu: React.FC<{ ids: string[]; onItemClick?: (id: string) => void }> = ({ ids, onItemClick }) => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>();
  const [position, setPosition] = React.useState<{ top: number; left: number }>();

  if (!isOverflowing) {
    return null;
  }

  const toggle = () => {
    if (position) {
      setPosition(undefined);
      return;
    }
    const rect = ref.current?.getBoundingClientRect();
    setPosition(rect ? { top: rect.bottom + 4, left: rect.left } : undefined);
  };

  return (
    <>
      <button
        ref={ref}
        type="button"
        className={styles.menu}
        aria-haspopup="menu"
        aria-expanded={Boolean(position)}
        aria-label={`${overflowCount} more items`}
        onClick={toggle}
      >
        +{overflowCount}
      </button>
      {position && (
        <div
          role="menu"
          className={styles.menuPopover}
          style={{ position: 'fixed', top: position.top, left: position.left }}
        >
          {ids.map(id =>
            id.startsWith('divider-') ? (
              <OverflowMenuDivider key={id} groupId={id.slice('divider-'.length)} />
            ) : (
              <OverflowMenuItem key={id} id={id} onClick={onItemClick && (() => onItemClick(id))} />
            ),
          )}
        </div>
      )}
    </>
  );
};

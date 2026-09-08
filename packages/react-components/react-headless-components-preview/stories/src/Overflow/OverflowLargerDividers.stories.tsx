import * as React from 'react';
import {
  Overflow,
  OverflowItem,
  OverflowDivider,
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

const GroupDivider = ({ groupId }: { groupId: string }): React.ReactElement => (
  <OverflowDivider groupId={groupId}>
    <div className={styles.divider} />
  </OverflowDivider>
);

const menuIds = ['1', 'divider-1', '2', 'divider-2', '3', '4', 'divider-3', '5', '6', '7', 'divider-4', '8'];

const OverflowMenuItem = ({ id }: { id: string }): React.ReactElement | null => {
  // Only the overflowed (hidden) items are listed in the menu.
  const isVisible = useIsOverflowItemVisible(id);
  return isVisible ? null : <MenuItem className={styles.menuItem}>Item {id}</MenuItem>;
};

const OverflowMenuDivider = ({ groupId }: { groupId: string }): React.ReactElement | null => {
  const groupVisibility = useIsOverflowGroupVisible(groupId);
  return groupVisibility === 'visible' ? null : <MenuDivider className={styles.menuDivider} />;
};

/**
 * `+N` button that opens a headless `Menu` listing the overflowed items. `MenuPopover` renders
 * through a portal but preserves React context, so the overflow hooks inside still read the
 * `Overflow` root's context. Entries prefixed with `divider-` render a group divider (when that
 * group is overflowing).
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
          {ids.map(id =>
            id.startsWith('divider-') ? (
              <OverflowMenuDivider key={id} groupId={id.slice('divider-'.length)} />
            ) : (
              <OverflowMenuItem key={id} id={id} />
            ),
          )}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

/**
 * `OverflowDivider` registers a divider with a `groupId` so its width is included in the overflow
 * calculation. Group dividers are hidden (and rendered in the menu) once their group overflows.
 */
export const LargerDividers = (): React.ReactElement => (
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

import * as React from 'react';
import {
  Overflow,
  OverflowItem,
  useOverflowMenu,
  useIsOverflowGroupVisible,
} from '@fluentui/react-headless-components-preview/overflow';

import { OverflowMenuItem } from './OverflowMenu';
import styles from './overflow.module.css';

const GROUPS = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

const menuIds = ['6', 'divider-1', '7', 'divider-2', '4', '5', 'divider-3', '1', '2', '3', 'divider-4', '8'];

/** In-container divider — hidden once its whole group has overflowed. */
const ContainerGroupDivider: React.FC<{ groupId: number }> = ({ groupId }) => {
  const groupVisibility = useIsOverflowGroupVisible(groupId.toString());

  if (groupVisibility === 'hidden') {
    return null;
  }

  return <div className={styles.divider} data-group={groupId} />;
};

/**
 * Menu divider — because priority differs from DOM order, a divider may be needed in the menu only
 * when an overflowing group precedes another overflowing group. This mirrors the styled story's
 * reference implementation.
 */
const MenuGroupDivider: React.FC<{ groupId: number }> = ({ groupId }) => {
  const groupVisibilities = Object.values(GROUPS).map(group => ({
    group,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    visibility: useIsOverflowGroupVisible(group.toString()),
  }));

  const currentGroupPosition = groupVisibilities.findIndex(x => x.group === groupId);
  const precedesOverflowingGroup = groupVisibilities
    .slice(currentGroupPosition + 1)
    .some(groupVisibility => groupVisibility.visibility !== 'visible');

  if (groupVisibilities[currentGroupPosition].visibility === 'visible' || !precedesOverflowingGroup) {
    return null;
  }

  return <div role="separator" className={styles.menuDivider} />;
};

const PriorityOverflowMenu: React.FC<{ ids: string[] }> = ({ ids }) => {
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
              <MenuGroupDivider key={id} groupId={Number(id.slice('divider-'.length))} />
            ) : (
              <OverflowMenuItem key={id} id={id} />
            ),
          )}
        </div>
      )}
    </>
  );
};

/**
 * Overflow groups respect item `priority`. Managing divider visibility here is non-trivial because
 * dividers can appear both in the container and the menu — read the code carefully before adopting.
 */
export const PriorityWithDividers = (): React.ReactNode => (
  <div className={styles.resizer}>
    <Overflow overflowDirection="start" padding={40}>
      <div className={styles.container}>
        <OverflowItem id="6" priority={6} groupId={GROUPS.ONE.toString()}>
          <button className={styles.item}>Priority 6</button>
        </OverflowItem>
        <ContainerGroupDivider groupId={GROUPS.ONE} />
        <OverflowItem id="7" priority={7} groupId={GROUPS.TWO.toString()}>
          <button className={styles.item}>Priority 7</button>
        </OverflowItem>
        <ContainerGroupDivider groupId={GROUPS.TWO} />
        <OverflowItem id="4" priority={4} groupId={GROUPS.THREE.toString()}>
          <button className={styles.item}>Priority 4</button>
        </OverflowItem>
        <OverflowItem id="5" priority={5} groupId={GROUPS.THREE.toString()}>
          <button className={styles.item}>Priority 5</button>
        </OverflowItem>
        <ContainerGroupDivider groupId={GROUPS.THREE} />
        <OverflowItem id="1" priority={1} groupId={GROUPS.FOUR.toString()}>
          <button className={styles.item}>Priority 1</button>
        </OverflowItem>
        <OverflowItem id="2" priority={2} groupId={GROUPS.FOUR.toString()}>
          <button className={styles.item}>Priority 2</button>
        </OverflowItem>
        <OverflowItem id="3" priority={3} groupId={GROUPS.FOUR.toString()}>
          <button className={styles.item}>Priority 3</button>
        </OverflowItem>
        <ContainerGroupDivider groupId={GROUPS.FOUR} />
        <OverflowItem id="8" priority={8} groupId={GROUPS.FIVE.toString()}>
          <button className={styles.item}>Priority 8</button>
        </OverflowItem>
        <PriorityOverflowMenu ids={menuIds} />
      </div>
    </Overflow>
  </div>
);

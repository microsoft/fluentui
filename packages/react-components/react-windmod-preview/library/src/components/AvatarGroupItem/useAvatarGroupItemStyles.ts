import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { AvatarSize } from '../Avatar';
import type { AvatarGroupItemState } from './AvatarGroupItem.types';
import { groupChildClasses } from './groupChildClasses';

import styles from './AvatarGroupItem.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const avatarGroupItemClassNames: { root: string } = {
  root: componentMarkers('avatar-group-item'),
};

type AvatarGroupItemRootDataAttributes = {
  'data-size'?: AvatarGroupItemState['size'];
};

// Shares its boundaries with the stack ring ladder but never its class: one emits a box-shadow,
// the other a custom property, and they are never applied together.
const pieDividerClass = (size: AvatarSize) => {
  if (size < 56) {
    return styles.pieDividerThick;
  }
  if (size < 72) {
    return styles.pieDividerThicker;
  }
  return styles.pieDividerThickest;
};

/**
 * Applies the visual contract, returning new state. The headless hook stamps no attributes at
 * all; `data-size` is the only one added here, because the box edge is the one value CSS cannot
 * bucket.
 */
export const useAvatarGroupItemStyles = (state: AvatarGroupItemState): AvatarGroupItemState => {
  const { isOverflowItem, layout, size } = state;

  const root: AvatarGroupItemState['root'] & AvatarGroupItemRootDataAttributes = {
    ...state.root,
    'data-size': size,
    className: clsx(
      avatarGroupItemClassNames.root,
      styles.root,
      isOverflowItem
        ? styles.overflowItem
        : [
            styles.nonOverflowItem,
            groupChildClasses(layout, size),
            layout === 'pie' && [styles.pie, pieDividerClass(size), styles.pieSlices],
          ],
      state.root.className,
    ),
  };

  return {
    ...state,
    root,
    avatar: slotClasses(
      state.avatar,
      !isOverflowItem && styles.avatarNonOverflow,
      layout === 'pie' && styles.avatarPie,
    ),
    overflowLabel: slotClasses(state.overflowLabel, styles.overflowLabel),
  };
};

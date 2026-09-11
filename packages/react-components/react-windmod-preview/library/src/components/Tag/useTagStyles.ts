import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { TagState } from './Tag.types';

import styles from './Tag.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const tagClassNames: { root: string } = {
  root: componentMarkers('tag'),
};

type TagRootDataAttributes = {
  'data-size'?: TagState['size'];
};

/**
 * The shape the shared slot decoration needs. Tag and InteractionTagPrimary both satisfy it. The
 * slots are taken from the resolved state rather than restated as `Slot<'span'>`: the shorthand
 * union is not spreadable.
 */
export type TagSlotState = {
  media?: TagState['media'];
  icon?: TagState['icon'];
  primaryText?: TagState['primaryText'];
  secondaryText?: TagState['secondaryText'];
};

/**
 * The look Tag's four content slots share, applied once. Tag's module owns the slot classes;
 * InteractionTagPrimary calls this and carries `fui-tag` alongside its own marker pair. That
 * marker is load-bearing, not decorative: `.media`, `.icon` and `.primary-text` reach `size`
 * through the group variant on it.
 *
 * Not a hook and deliberately not `use`-named — see `useNavItemStyles`.
 */
export const tagSlotClasses = <S extends TagSlotState>(state: S): S => ({
  ...state,
  media: slotClasses(state.media, styles.media),
  icon: slotClasses(state.icon, styles.icon),
  primaryText: slotClasses(
    state.primaryText,
    styles.primaryText,
    state.secondaryText ? styles.withSecondaryText : styles.withoutSecondaryText,
  ),
  secondaryText: slotClasses(state.secondaryText, styles.secondaryText),
});

/**
 * Applies the visual contract, returning new state. `filled` and `rounded` are the base looks and
 * carry no class. `withoutDismiss` keys off the dismissIcon SLOT rather than `dismissible`, and
 * `withoutMedia` off both content slots, because those are the conditions the visual contract is
 * defined by — a dismissIcon supplied without `dismissible` drops the trailing padding even though
 * nothing renders there. The headless hook already stamps data-disabled, data-dismissible and
 * data-selected; only `data-size` is missing, and CSS reads it on the root and through
 * group-size-* on every slot.
 */
export const useTagStyles = (state: TagState): TagState => {
  const { appearance, disabled, selected, shape, size } = state;

  const root: TagState['root'] & TagRootDataAttributes = {
    ...state.root,
    'data-size': size,
    className: clsx(
      tagClassNames.root,
      styles.root,
      shape === 'circular' && styles.circular,
      appearance !== 'filled' && styles[appearance],
      selected && !disabled && styles.selected,
      !state.media && !state.icon && styles.withoutMedia,
      !state.dismissIcon && styles.withoutDismiss,
      state.root.className,
    ),
  };

  return {
    ...tagSlotClasses(state),
    root,
    dismissIcon: slotClasses(state.dismissIcon, styles.dismissIcon),
  };
};

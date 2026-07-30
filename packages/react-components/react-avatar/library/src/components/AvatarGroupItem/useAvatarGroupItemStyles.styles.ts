'use client';

/*
 * NOTE (Griffel → Tailwind + CSS Modules migration): this file keeps `'use client'` because
 * it still calls `useSizeStyles()` / `useGroupChildClassName()`, so eslint treats the styles
 * hook as a React hook and `enforce-use-client` never reports the directive as unnecessary.
 */

import { clsx } from 'clsx';
import { useSizeStyles } from '../../Avatar';
import type { AvatarGroupItemState } from './AvatarGroupItem.types';
import type { AvatarGroupProps } from '../../AvatarGroup';
import type { AvatarSize } from '../../Avatar';

import styles from './AvatarGroupItem.module.css';

/**
 * AvatarGroupItem's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-AvatarGroupItem` / `fui-AvatarGroupItem__<slot>` BEM statics are gone (D16.1), and the
 * type has narrowed from `SlotClassNames<AvatarGroupItemSlots>` to `{ root: string }` so that
 * a read of `avatar` or `overflowLabel` is a compile error on the exact line that would
 * otherwise have silently stopped matching. The `avatar` slot is an `<Avatar>` root, so it
 * remains addressable through `avatarClassNames.root` — its own component's marker.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + avatarGroupItemClassNames.root` is invalid CSS. Use
 * `fuiSelector(avatarGroupItemClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's three, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const avatarGroupItemClassNames: { root: string } = {
  root: 'group/fui-avatar-group-item',
};

/**
 * Data attributes rendered on the root slot and matched by in-module attribute selectors in
 * `AvatarGroupItem.module.css`.
 *
 * `data-size` drives the pie layout's divider width only; the item's own width/height comes
 * from the shared `useSizeStyles()` classes, and the stack/spread spacing stays in JS because
 * `useGroupChildClassName` is a shared class-name factory serving both this component and
 * AvatarGroupPopover's trigger button, on two different elements. `isOverflowItem` and
 * `layout` are boolean/look conditions and stay module-class branches, exactly as the Griffel
 * hook had them.
 */
type AvatarGroupItemRootDataAttributes = {
  'data-size': AvatarSize;
};

/**
 * Apply styling to the AvatarGroupItem slots based on the state
 */
export const useAvatarGroupItemStyles_unstable = (state: AvatarGroupItemState): AvatarGroupItemState => {
  const { isOverflowItem, layout, size } = state;

  const sizeStyles = useSizeStyles();
  const groupChildClassName = useGroupChildClassName(layout, size);

  const rootDataAttributes: AvatarGroupItemRootDataAttributes = {
    'data-size': size,
  };

  // Module class FIRST, named group marker second, consumer className last (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so index 0 is always the hashed, selector-safe
  // `fuicm-*` token — which is what keeps the marker off `classList[0]`, where nwsapi's
  // `:scope` polyfill would throw on its `/` under jsdom (D15.1). The BEM static that used
  // to lead this call is gone (D16.1): the marker is now AvatarGroupItem's SOLE public
  // identity class, and the only handle by which another module — in this package or any
  // other — can style an element from this AvatarGroupItem's state, because `styles.root`
  // is hashed and unaddressable from outside this file (DECISIONS.md D15).
  //
  // AvatarGroupItem needs no state mirrors: `data-size` is stamped on this very element
  // above, so `@variant group-*/fui-avatar-group-item` reads it as-is (D15.6, Tier 0). The
  // marker nests under `group/fui-avatar-group` for free — each component root carries its
  // own (D15.1) — and the `avatar` slot, which is an `<Avatar>` root, already carries
  // `group/fui-avatar` from that component's own hook.
  //
  // Cascade priority is decided by the `@layer fui.*` order in AvatarGroupItem.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces.
  //
  // The `dir === 'rtl'` branch that used to push `pieStyles.rtlSlices` is gone: the mirror
  // now lives in the module under the shared `rtl` variant, which resolves the computed
  // direction from the DOM (DECISIONS.md D5). `useFluent()` is therefore no longer called.
  //
  state = {
    ...state,
    root: {
      ...state.root,
      ...rootDataAttributes,
      className: clsx(
        styles.root,
        'group/fui-avatar-group-item',
        !isOverflowItem && styles['non-overflow-item'],
        !isOverflowItem && groupChildClassName,
        !isOverflowItem && sizeStyles[size],
        !isOverflowItem && layout === 'pie' && styles.pie,
        isOverflowItem && styles['overflow-item'],
        state.root.className,
      ),
    },
  };

  // Both module classes here are CONDITIONAL, so this slot can emit the consumer's class
  // alone. That is harmless and deliberately NOT "fixed" (DECISIONS.md D16 / design §4c):
  // the slot carries no marker, so the D15.1 leading-token invariant is not in play, and the
  // element is an `<Avatar>` root that leads with Avatar's own unconditional `styles.root`.
  //
  state = {
    ...state,
    avatar: {
      ...state.avatar,
      className: clsx(
        !isOverflowItem && styles['avatar-non-overflow-item'],
        layout === 'pie' && styles['avatar-pie'],
        state.avatar.className,
      ),
    },
  };

  if (state.overflowLabel) {
    state = {
      ...state,
      overflowLabel: {
        ...state.overflowLabel,
        className: clsx(styles['overflow-label'], state.overflowLabel.className),
      },
    };
  }

  return state;
};

/**
 * Hook for getting the className for the children of AvatarGroup. This hook will provide the spacing and outlines
 * needed for each layout.
 */
export const useGroupChildClassName = (layout: AvatarGroupProps['layout'], size: AvatarSize): string => {
  const layoutClasses = [];

  if (size) {
    if (layout === 'stack') {
      if (size < 56) {
        layoutClasses.push(styles['stack-thick']);
      } else if (size < 72) {
        layoutClasses.push(styles['stack-thicker']);
      } else {
        layoutClasses.push(styles['stack-thickest']);
      }

      if (size < 24) {
        layoutClasses.push(styles['stack-xxs']);
      } else if (size < 48) {
        layoutClasses.push(styles['stack-xs']);
      } else if (size < 96) {
        layoutClasses.push(styles['stack-s']);
      } else {
        layoutClasses.push(styles['stack-l']);
      }
    } else if (layout === 'spread') {
      if (size < 20) {
        layoutClasses.push(styles['spread-s']);
      } else if (size < 32) {
        layoutClasses.push(styles['spread-m-nudge']);
      } else if (size < 64) {
        layoutClasses.push(styles['spread-l']);
      } else {
        layoutClasses.push(styles['spread-xl']);
      }
    }
  }

  return clsx(...layoutClasses);
};

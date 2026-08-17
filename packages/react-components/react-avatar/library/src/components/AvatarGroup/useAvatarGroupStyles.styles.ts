'use client';

/*
 * NOTE: this file keeps `'use client'` because
 * it still calls `useSizeStyles()`, so eslint treats the styles hook as a React hook and
 * `enforce-use-client` never reports the directive as unnecessary.
 */

import { clsx } from 'clsx';
import { useSizeStyles } from '../Avatar/useAvatarStyles.styles';
import type { AvatarGroupState } from './AvatarGroup.types';

import styles from './AvatarGroup.module.css';

/**
 * AvatarGroup's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-AvatarGroup` BEM static is gone (D16.1), and the type has narrowed from
 * `SlotClassNames<AvatarGroupSlots>` to `{ root: string }` — AvatarGroup declared no sub-slot
 * statics, so here the narrowing drops no key.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + avatarGroupClassNames.root` is invalid CSS. Use
 * `fuiSelector(avatarGroupClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's three, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const avatarGroupClassNames: { root: string } = {
  root: 'group/fui-avatar-group',
};

/**
 * Apply styling to the AvatarGroup slots based on the state
 */
export const useAvatarGroupStyles_unstable = (state: AvatarGroupState): AvatarGroupState => {
  const { layout, size } = state;
  const sizeStyles = useSizeStyles();

  // Module class FIRST, named group marker second, consumer className last (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so index 0 is always the hashed, selector-safe
  // `fuicm-*` token — which is what keeps the marker off `classList[0]`, where nwsapi's
  // `:scope` polyfill would throw on its `/` under jsdom (D15.1). The BEM static that used
  // to lead this call is gone (D16.1): the marker is now AvatarGroup's SOLE public identity
  // class, and the only handle by which another module — in this package or any other — can
  // style an element from this AvatarGroup's state, because `styles.root` is hashed and
  // unaddressable from outside this file (DECISIONS.md D15).
  //
  // AvatarGroup stamps no attributes (its `layout`/`size` conditions stay resolved class
  // names — `useGroupChildClassName` is shared with AvatarGroupItem and AvatarGroupPopover
  // and hands out class names to both), so the marker's value here is structural: it is the
  // ancestor handle an
  // AvatarGroupItem or a consumer's overflow surface can hang pseudo-class reads off
  // (`group-hover/fui-avatar-group`, `group-focus-within/fui-avatar-group`), none of which
  // need mirroring (D15.6).
  //
  // Cascade priority is decided by the `@layer fui.*` order in AvatarGroup.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces. The conditions are unchanged.
  //
  state = {
    ...state,
    root: {
      ...state.root,
      className: clsx(
        styles.root,
        avatarGroupClassNames.root,
        layout === 'pie' && sizeStyles[size],
        layout === 'pie' && styles.pie,
        state.root.className,
      ),
    },
  };

  return state;
};

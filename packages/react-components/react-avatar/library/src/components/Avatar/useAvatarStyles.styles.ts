'use client';

/*
 * NOTE: this file keeps `'use client'` because
 * it still calls `useSizeStyles()`, so eslint treats the styles hook as a React hook and
 * `enforce-use-client` never reports the directive as unnecessary. Converted hooks that call
 * nothing — Divider, Button — carry no directive at all.
 */

import { clsx } from 'clsx';
import type { AvatarSize, AvatarState } from './Avatar.types';

import styles from './Avatar.module.css';

/**
 * Avatar's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const avatarClassNames: { root: string } = {
  root: 'group/fui-avatar',
};

/**
 * The numeric width/height scale, keyed by `AvatarSize`.
 *
 * This stays a record of module CLASS names rather than moving onto `data-size` like every
 * other size-derived rule in `Avatar.module.css`: `useSizeStyles` is an existing export
 * consumed by AvatarGroup, AvatarGroupItem and AvatarGroupPopover, and each applies it to a
 * DIFFERENT element (an Avatar root, an item root, a trigger button), so a `data-size`-keyed
 * rule in this module could not reach three of them. A hook that hands out class names keeps
 * all four call sites working unchanged and defines the scale exactly once; the size BUCKETS
 * (typography, radius, ring width, shadow, icon size) do ride `data-size`, per the cookbook's
 * scale-prop rule.
 */
const sizeClassNames: Record<AvatarSize, string> = {
  16: styles.size16,
  20: styles.size20,
  24: styles.size24,
  28: styles.size28,
  32: styles.size32,
  36: styles.size36,
  40: styles.size40,
  48: styles.size48,
  56: styles.size56,
  64: styles.size64,
  72: styles.size72,
  96: styles.size96,
  120: styles.size120,
  128: styles.size128,
};

export const useSizeStyles = (): Record<AvatarSize, string> => sizeClassNames;

/**
 * Data attributes rendered on the root slot and matched by in-module attribute selectors in
 * `Avatar.module.css`.
 *
 * `data-size` carries a dense NUMERIC scale (16…128) and `data-active*` a pair of
 * Avatar-only states, so all three are selected with `&:where([data-…])` inside the module
 * rather than through the shared variant catalog (CONVERSION_GUIDE scale-prop rule; the
 * catalog already owns the name `active` for the `:active` pseudo-class, which is a
 * different thing entirely).
 *
 * `data-active` / `data-active-appearance` are stamped only when `active` is `'active'` or
 * `'inactive'`, reproducing the Griffel hook's guard exactly — `active="unset"` renders no
 * attribute at all, so `[data-active-appearance='ring']` alone implies the active state.
 */
type AvatarRootDataAttributes = {
  'data-size': AvatarSize;
  'data-active'?: 'active' | 'inactive';
  'data-active-appearance'?: AvatarState['activeAppearance'];
};

export const useAvatarStyles_unstable = (state: AvatarState): AvatarState => {
  const { size, shape, active, activeAppearance, color } = state;

  const sizeStyles = useSizeStyles();
  const isActive = active === 'active' || active === 'inactive';
  const hasRing = isActive && (activeAppearance === 'ring' || activeAppearance === 'ring-shadow');

  const rootDataAttributes: AvatarRootDataAttributes = {
    'data-size': size,
    'data-active': active === 'unset' ? undefined : active,
    'data-active-appearance': isActive ? activeAppearance : undefined,
  };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: {
      ...state.root,
      ...rootDataAttributes,
      className: clsx(
        styles.root,
        avatarClassNames.root,
        size !== 32 && sizeStyles[size],
        state.badge && styles['badge-align'],
        // `||`, not `??` — byte-for-byte the Griffel condition (`styles[state.badge.size || 'medium']`)
        state.badge && styles[`badge-${state.badge.size || 'medium'}`],
        shape === 'square' && styles.square,
        hasRing && styles[`ring-${color}`],
        hasRing && state.badge && styles['ring-badge-cutout'],
        state.root.className,
      ),
    },
  };

  if (state.badge) {
    state = { ...state, badge: { ...state.badge, className: clsx(styles.badge, state.badge.className) } };
  }

  if (state.image) {
    state = {
      ...state,
      image: {
        ...state.image,
        className: clsx(styles.image, styles[color], state.badge && styles['badge-cutout'], state.image.className),
      },
    };
  }

  if (state.initials) {
    state = {
      ...state,
      initials: {
        ...state.initials,
        className: clsx(
          styles['icon-initials'],
          styles[color],
          state.badge && styles['badge-cutout'],
          state.initials.className,
        ),
      },
    };
  }

  // `styles.icon` carries no declarations of its own — it is the hook the root's
  // `data-size` buckets use to reach the icon glyph (`.root:where([data-size='48'])
  // :where(.icon)`), which is how the Griffel `iconSizeClass` chain is expressed now.
  //
  if (state.icon) {
    state = {
      ...state,
      icon: {
        ...state.icon,
        className: clsx(
          styles['icon-initials'],
          styles.icon,
          styles[color],
          state.badge && styles['badge-cutout'],
          state.icon.className,
        ),
      },
    };
  }

  return state;
};

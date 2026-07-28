'use client';

/*
 * NOTE (Griffel → Tailwind + CSS Modules migration): this file needs NO
 * `enforce-use-client` suppression and KEEPS its `react-hooks/immutability` disables. It
 * still calls `useSizeStyles()`, so eslint still treats the styles hook as a React hook and
 * both rules apply to it exactly as before — the same split react-badge's CounterBadge and
 * react-button's ToggleButton landed on, versus Divider/Button, whose converted hooks call
 * nothing and therefore lost both.
 *
 * The state-mutation contract itself is deliberately preserved (DECISIONS.md D14); its
 * removal is a single Phase 3 sweep, not a per-conversion change.
 */

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AvatarSize, AvatarSlots, AvatarState } from './Avatar.types';

import styles from './Avatar.module.css';

export const avatarClassNames: SlotClassNames<AvatarSlots> = {
  root: 'fui-Avatar',
  image: 'fui-Avatar__image',
  initials: 'fui-Avatar__initials',
  icon: 'fui-Avatar__icon',
  badge: 'fui-Avatar__badge',
};

/**
 * The numeric width/height scale, keyed by `AvatarSize`.
 *
 * This stays a record of module CLASS names rather than moving onto `data-size` like every
 * other size-derived rule in `Avatar.module.css`: `useSizeStyles` is an existing export
 * consumed by AvatarGroup, AvatarGroupItem and AvatarGroupPopover, and the last of those is
 * still a Griffel file (its overrides target the unconverted PopoverSurface). A hook that
 * hands out class names keeps all four call sites working unchanged and defines the scale
 * exactly once; the size BUCKETS (typography, radius, ring width, shadow, icon size) do ride
 * `data-size`, per the cookbook's scale-prop rule.
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

  const root = state.root as AvatarState['root'] & AvatarRootDataAttributes;

  /* eslint-disable react-hooks/immutability -- state-mutation builder, preserved per D14 */
  root['data-size'] = size;
  root['data-active'] = active === 'unset' ? undefined : active;
  root['data-active-appearance'] = isActive ? activeAppearance : undefined;
  /* eslint-enable react-hooks/immutability */

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this Avatar's state, because `styles.root` is
  // hashed and unaddressable from outside this file (DECISIONS.md D15).
  //
  // Avatar needs no state mirrors: `data-size`, `data-active` and `data-active-appearance`
  // are stamped on this very element above, so `@variant group-*/fui-avatar` reads them
  // as-is (D15.6, Tier 0). AvatarGroupPopover is still Griffel and gets no marker until it
  // converts (D15.1, unconverted siblings).
  //
  // Cascade priority is decided by the `@layer fui.*` order in Avatar.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces. Every remaining condition below is
  // byte-for-byte the one the Griffel `rootClasses` builder used; the size-bucket
  // if/else chains (typography, square radius, ring width, shadow depth, icon size) moved
  // out of JS and onto `data-size`.
  //
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    avatarClassNames.root,
    'group/fui-avatar',
    styles.root,
    size !== 32 && sizeStyles[size],
    state.badge && styles['badge-align'],
    // `||`, not `??` — byte-for-byte the Griffel condition (`styles[state.badge.size || 'medium']`)
    state.badge && styles[`badge-${state.badge.size || 'medium'}`],
    shape === 'square' && styles.square,
    hasRing && styles[`ring-${color}`],
    hasRing && state.badge && styles['ring-badge-cutout'],
    state.root.className,
  );

  if (state.badge) {
    // eslint-disable-next-line react-hooks/immutability
    state.badge.className = clsx(avatarClassNames.badge, styles.badge, state.badge.className);
  }

  if (state.image) {
    // eslint-disable-next-line react-hooks/immutability
    state.image.className = clsx(
      avatarClassNames.image,
      styles.image,
      styles[color],
      state.badge && styles['badge-cutout'],
      state.image.className,
    );
  }

  if (state.initials) {
    // eslint-disable-next-line react-hooks/immutability
    state.initials.className = clsx(
      avatarClassNames.initials,
      styles['icon-initials'],
      styles[color],
      state.badge && styles['badge-cutout'],
      state.initials.className,
    );
  }

  if (state.icon) {
    // `styles.icon` carries no declarations of its own — it is the hook the root's
    // `data-size` buckets use to reach the icon glyph (`.root:where([data-size='48'])
    // :where(.icon)`), which is how the Griffel `iconSizeClass` chain is expressed now.
    //
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(
      avatarClassNames.icon,
      styles['icon-initials'],
      styles.icon,
      styles[color],
      state.badge && styles['badge-cutout'],
      state.icon.className,
    );
  }

  return state;
};

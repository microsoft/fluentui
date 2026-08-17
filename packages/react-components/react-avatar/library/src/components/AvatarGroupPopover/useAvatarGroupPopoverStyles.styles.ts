'use client';

/*
 * NOTE: this file keeps `'use client'` because
 * it still calls `useSizeStyles()` / `useGroupChildClassName()`, so eslint treats the styles
 * hook as a React hook and `enforce-use-client` never reports the directive as unnecessary.
 *
 * `avatarGroupPopoverClassNames.root` names the class the trigger button actually carries —
 * see the marker note on the `clsx` call below.
 */

import { clsx } from 'clsx';
import { useGroupChildClassName } from '../AvatarGroupItem/useAvatarGroupItemStyles.styles';
import { useSizeStyles } from '../Avatar/useAvatarStyles.styles';
import type { AvatarSize } from '../Avatar/Avatar.types';
import type { AvatarGroupPopoverState } from './AvatarGroupPopover.types';

import styles from './AvatarGroupPopover.module.css';

/**
 * AvatarGroupPopover's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * CAVEAT — `root` names the marker, but the marker is NOT on the `root` slot, because that
 * slot renders no DOM. This component's `root` is a `<Popover>`, which emits no element of
 * its own (nor does the `<PopoverTrigger>` / `<Tooltip>` pair nested inside it), so the old
 * `fui-AvatarGroupPopover` static never reached the DOM either — its own conformance options
 * said so in as many words: _"root shouldn't be expected since the root is a Popover"_. The
 * marker therefore sits on `triggerButton`, this component's OUTERMOST RENDERED node, which
 * is the placement rule D15.1 actually states and the same resolution `react-tooltip` (no
 * `root` at all) and `react-popover` (marker on `PopoverSurface`) reached. Unlike before the
 * conversion, `root` now selects a real element.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const avatarGroupPopoverClassNames: { root: string } = {
  root: 'group/fui-avatar-group-popover',
};

/**
 * Data attributes rendered on the trigger button and matched by in-module attribute selectors
 * in `AvatarGroupPopover.module.css`.
 *
 * `data-size` carries a dense NUMERIC scale (16…128), so its buckets are selected with
 * `&:where([data-size='…'])` inside the module rather than through the shared variant catalog
 * (CONVERSION_GUIDE scale-prop rule). It drives two chains that used to be JS if/else ladders:
 * the border-width ramp and the `indicator` type/icon ramp.
 *
 * It is stamped on the trigger button rather than mirrored from a root because the trigger
 * button IS the outermost rendered element — the selector and the attribute are on the same
 * node, so no mirroring is in play (D15.6, Tier 0). `layout` and `popoverOpen` stay module
 * classes: they are look/boolean conditions, nothing below them needs to read them, and
 * `data-*` is fallback-only under D15.6.
 */
type AvatarGroupPopoverTriggerButtonDataAttributes = {
  'data-size': AvatarSize;
};

/**
 * Apply styling to the AvatarGroupPopover slots based on the state
 */
export const useAvatarGroupPopoverStyles_unstable = (state: AvatarGroupPopoverState): AvatarGroupPopoverState => {
  const { indicator, size, layout, popoverOpen } = state;

  const sizeStyles = useSizeStyles();
  const groupChildClassName = useGroupChildClassName(layout, size);

  const triggerButtonDataAttributes: AvatarGroupPopoverTriggerButtonDataAttributes = {
    'data-size': size,
  };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    triggerButton: {
      ...state.triggerButton,
      ...triggerButtonDataAttributes,
      className: clsx(
        styles['trigger-button'],
        avatarGroupPopoverClassNames.root,
        groupChildClassName,
        sizeStyles[size],
        layout === 'pie' && styles['trigger-button-pie'],
        layout !== 'pie' && styles['trigger-button-interactive'],
        layout !== 'pie' && popoverOpen && styles['trigger-button-selected'],
        indicator === 'count' ? styles['indicator-count'] : styles['indicator-icon'],
        state.triggerButton.className,
      ),
    },
  };

  state = { ...state, content: { ...state.content, className: clsx(styles.content, state.content.className) } };

  // `popoverSurface` is a `<PopoverSurface>` root, so this class reaches that component's hook
  // as its CONSUMER className. It lives at `fui.components.l2` for that reason (D2 amendment
  // 2) — and stays LAYERED, because react-popover is converted and writes only at l1.
  //
  state = {
    ...state,
    popoverSurface: {
      ...state.popoverSurface,
      className: clsx(styles['popover-surface'], state.popoverSurface.className),
    },
  };

  return state;
};

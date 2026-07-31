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
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. The `fui-AvatarGroupPopover__<slot>` BEM
 * statics are gone (D16.1), and the type has narrowed from
 * `SlotClassNames<AvatarGroupPopoverSlots>` to `{ root: string }` so that a read of
 * `content`, `popoverSurface`, `tooltip` or `triggerButton` is a compile error on the exact
 * line that would otherwise have silently stopped matching.
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
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + avatarGroupPopoverClassNames.root` is invalid CSS. Use
 * `fuiSelector(avatarGroupPopoverClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's three, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
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

  // Module class FIRST, named group marker second, consumer className last (DECISIONS.md
  // D16.2). `styles['trigger-button']` is unconditional, so index 0 is always the hashed,
  // selector-safe `fuicm-*` token — which is what keeps the marker off `classList[0]`, where
  // nwsapi's `:scope` polyfill would throw on its `/` under jsdom (D15.1). The BEM statics
  // that used to lead this call are gone (D16.1): the marker is now AvatarGroupPopover's SOLE
  // public identity class, and the only handle by which another module can style an element
  // from this component's state, because every `styles.*` here is hashed and unaddressable
  // from outside this file (DECISIONS.md D15).
  //
  // The marker is on THIS slot, not on `root`, because `root` is a `<Popover>` that renders
  // no DOM element — see the note on `avatarGroupPopoverClassNames` above. `triggerButton` is
  // the outermost node this component actually renders, which is also what `getTargetElement`
  // resolves to, so `component-has-group-marker` checks exactly this class list.
  //
  // `groupChildClassName` and `sizeStyles[size]` are classes owned by AvatarGroupItem's and
  // Avatar's modules and led this list under mergeClasses. They no longer need to: argument
  // order carries no cascade meaning here, and they collide with nothing in this module
  // (they set only `box-shadow` / `margin-inline-start` and `width`/`height` respectively),
  // so both stay at `fui.components.l1` alongside it with no cross-module tie to break.
  //
  // Cascade priority is decided by the `@layer fui.*` order in AvatarGroupPopover.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, and for the block ordering that reproduces
  // Griffel's specificity/bucket winners among base, forced-colors, focus-visible and
  // hover/active. Every condition below is byte-for-byte the one the Griffel builder used;
  // the two size ladders (border width, indicator type ramp) moved out of JS onto `data-size`.
  //
  state = {
    ...state,
    triggerButton: {
      ...state.triggerButton,
      ...triggerButtonDataAttributes,
      className: clsx(
        styles['trigger-button'],
        'group/fui-avatar-group-popover',
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

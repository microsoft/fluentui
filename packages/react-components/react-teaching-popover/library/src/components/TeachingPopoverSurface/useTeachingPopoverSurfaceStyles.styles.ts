'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike the converted leaf hooks in this package this file needs NO `enforce-use-client`
 * suppression — it still calls `usePopoverSurfaceStyles_unstable`, so the rule agrees the
 * directive is required. Leaf hooks that call nothing carry a trailing `eslint-disable-line`
 * instead; see useTeachingPopoverBodyStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { usePopoverSurfaceStyles_unstable } from '@fluentui/react-popover';
import type { TeachingPopoverSurfaceState } from './TeachingPopoverSurface.types';

import styles from './TeachingPopoverSurface.module.css';

/**
 * TeachingPopoverSurface's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-TeachingPopoverSurface` BEM static is gone (D16.1), and the type has narrowed from
 * `SlotClassNames<TeachingPopoverSurfaceSlots>` to `{ root: string }`.
 *
 * This root IS react-popover's `PopoverSurface` root, so it carries TWO markers by design —
 * this one and `group/fui-popover-surface`, stamped by `usePopoverSurfaceStyles_unstable` on
 * the same element (D16.3). A descendant can address whichever identity it means. The
 * conformance suite is told about the pair through `testOptions['has-group-marker'].markers`.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + teachingPopoverSurfaceClassNames.root` is invalid CSS.
 * Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5);
 * `element.classList.contains(...)` is token-taking and needs no escaping.
 */
export const teachingPopoverSurfaceClassNames: { root: string } = {
  root: 'group/fui-teaching-popover-surface',
};

/**
 * Apply styling to the TeachingPopoverSurface slots based on the state
 */
export const useTeachingPopoverSurfaceStyles_unstable = (
  state: TeachingPopoverSurfaceState,
): TeachingPopoverSurfaceState => {
  // Module class FIRST, named group marker second, consumer className last (DECISIONS.md
  // D16.2). `usePopoverSurfaceStyles_unstable` — called LAST, below — additionally prepends
  // PopoverSurface's own unconditional `styles.root`, so the token that actually renders at
  // `classList[0]` is react-popover's hashed module class. Either way neither marker is index
  // 0, where nwsapi's `:scope` polyfill would throw on its `/` under jsdom (D15.1).
  //
  // Cascade priority is decided by the `@layer fui.*` order in TeachingPopoverSurface.module.css
  // — its single block sits at `fui.components.l2`, above react-popover's l1 — not by the order
  // of these arguments.
  //
  state = {
    ...state,
    root: { ...state.root, className: clsx(styles.root, 'group/fui-teaching-popover-surface', state.root.className) },
  };

  // Called LAST, exactly as before — the Griffel source's comment for this line was "Make sure
  // to merge teaching bubble surface prior to popover styles", i.e. compose here first so that
  // under `mergeClasses` these classes arrived as PopoverSurface's trailing argument and won.
  // The `fui.components.l2` altitude reproduces that winner now, but the call order still has
  // to stand so the consumer className stays last in the rendered class attribute.
  const updatedState = usePopoverSurfaceStyles_unstable(state);

  return updatedState;
};

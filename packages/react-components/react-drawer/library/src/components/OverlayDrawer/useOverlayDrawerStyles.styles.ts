import type * as React from 'react';
import { clsx } from 'clsx';

import type { OverlayDrawerState } from './OverlayDrawer.types';
import { setDrawerBaseDataAttributes } from '../../shared/useDrawerBaseStyles.styles';

import styles from './OverlayDrawer.module.css';

/**
 * OverlayDrawer's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * The value is a class TOKEN, not a selector — build one with `fuiSelector()` from
 * `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately untagged: `@deprecated` would propagate to every re-exporting barrel and
 * trip `@typescript-eslint/no-deprecated` at each one. The narrowed type is the contract.
 */
export const overlayDrawerClassNames: { root: string } = {
  root: 'group/fui-overlay-drawer',
};

/**
 * Apply styling to the OverlayDrawer slots based on the state
 */
export const useOverlayDrawerStyles_unstable = (state: OverlayDrawerState): OverlayDrawerState => {
  const backdrop = state.root.backdrop as React.HTMLAttributes<HTMLDivElement> | undefined;

  // `position` and `size` drive `:where([data-position=…])` / `@variant size-…` rules in
  // OverlayDrawer.module.css, replacing the `useDrawerBaseClassNames` lookup and the
  // `rootStyles[state.position]` index. The root slot's element type is
  // `OverlayDrawerSurface`, not an intrinsic, but the attributes still reach the DOM:
  // `useDialogSurface_unstable` funnels `...props` through `getIntrinsicElementProps`, and
  // `getNativeElementProps` allows every `data-`-prefixed key through
  // (react-utilities/src/utils/properties.ts:476).
  setDrawerBaseDataAttributes(state);

  // ARGUMENT ORDER — `styles.root`, marker, conditional module classes, consumer className
  // (DECISIONS.md D16.2). The unconditional hashed module class leads so the marker is never
  // `classList[0]`: nwsapi's `:scope` polyfill builds its anchor from
  // `escape(element.classList[0])`, and the `/` in `group/fui-overlay-drawer` survives that
  // escaping into an invalid selector, throwing a render-time `AggregateError` under jsdom
  // (DECISIONS.md D15.1). Before D16 the `fui-OverlayDrawer` static held that position;
  // `styles.root` holds it now. `styles.absolute` cannot: it is conditional on
  // `hasMountNodeElement`.
  //
  // Cascade priority is decided by the `@layer fui.*` order in OverlayDrawer.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(
    styles.root,
    overlayDrawerClassNames.root,
    state.hasMountNodeElement && styles.absolute,
    state.root.className,
  );

  // The backdrop is a sub-slot, so it carries no marker and has no public class-name handle
  // any more (D16.1). Once `overlayDrawerClassNames.backdrop` is gone the assignment has
  // nothing to contribute unless the drawer is portalled into a consumer `mountNode`, so it
  // is guarded on that instead of composing `clsx(false, backdrop.className)` — an identity
  // on the consumer's own string (CONVERSION_GUIDE, "A slot whose only library token is the
  // static"). `.backdrop-absolute` sits at `fui.components.l2`, not l1: this element's base
  // styles come from `useOverlayDrawerSurfaceStyles_unstable` (D2 amendment 2).
  if (backdrop && state.hasMountNodeElement) {
    backdrop.className = clsx(styles['backdrop-absolute'], backdrop.className);
  }

  return state;
};

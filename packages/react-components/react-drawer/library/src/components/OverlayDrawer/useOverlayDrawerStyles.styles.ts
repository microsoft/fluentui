'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeStyles` is
 * gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

import type * as React from 'react';
import { clsx } from 'clsx';

import type { OverlayDrawerState } from './OverlayDrawer.types';
import { setDrawerBaseDataAttributes } from '../../shared/useDrawerBaseStyles.styles';

import styles from './OverlayDrawer.module.css';

/**
 * OverlayDrawer's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `backdrop` key is gone along with the `fui-OverlayDrawer*` BEM statics (D16.1), and the
 * type has narrowed from `SlotClassNames<Omit<OverlayDrawerSurfaceSlots, 'backdropMotion'>>`
 * to `{ root: string }` so that any read of the per-slot key is a compile error on the exact
 * line that would otherwise have silently stopped matching.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + overlayDrawerClassNames.root` is invalid
 * CSS. Use `fuiSelector(overlayDrawerClassNames.root)` from `@fluentui/react-utilities`
 * (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
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
    'group/fui-overlay-drawer',
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

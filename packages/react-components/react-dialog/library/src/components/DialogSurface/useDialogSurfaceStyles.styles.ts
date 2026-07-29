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

import { clsx } from 'clsx';

import type { DialogSurfaceState } from './DialogSurface.types';

import styles from './DialogSurface.module.css';

/**
 * DialogSurface's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS, and deliberately not tagged `@deprecated`: the constant
 * itself is not going away, only the ability to reach a component's internals through it. The
 * `fui-DialogSurface` / `fui-DialogSurface__backdrop` BEM statics are gone (D16.1), the type is
 * narrowed to `{ root: string }` so a per-slot read such as `dialogSurfaceClassNames.backdrop`
 * is a compile error rather than a silently-selects-nothing string, and the value is a class
 * TOKEN, not a selector — use `fuiSelector(dialogSurfaceClassNames.root)` from
 * `@fluentui/react-utilities` to build a selector from it, because the `/` is legal in a class
 * token but terminates the name in a selector.
 */
export const dialogSurfaceClassNames: { root: string } = {
  root: 'group/fui-dialog-surface',
};

/**
 * Apply styling to the DialogSurface slots based on the state
 */
export const useDialogSurfaceStyles_unstable = (state: DialogSurfaceState): DialogSurfaceState => {
  const { root, backdrop, open, unmountOnClose, treatBackdropAsNested, backdropAppearance } = state;

  const isBackdropTransparent = backdropAppearance ? backdropAppearance === 'transparent' : treatBackdropAsNested;
  const mountedAndClosed = !unmountOnClose && !open;

  // ARGUMENT ORDER — `styles.root`, marker, conditional module classes, consumer className
  // (DECISIONS.md D16.2). Order carries no cascade meaning (the `@layer fui.*` order decides
  // every tie, DECISIONS.md D2), so the only thing position buys is the D15.1 invariant: the
  // marker must never be `classList[0]`, because nwsapi's `:scope` polyfill builds its anchor
  // from `escape(element.classList[0])` and the `/` in `group/fui-dialog-surface` survives
  // that escaping into an invalid selector, throwing a render-time `AggregateError` under
  // jsdom. `styles.root` is the unconditional hashed module class that holds index 0 now that
  // the `fui-DialogSurface` static is gone.
  //
  // The marker is written as a LITERAL rather than read back out of
  // `dialogSurfaceClassNames` — greppable, sortable, and asserted by the
  // `component-has-group-marker` conformance test (DECISIONS.md D15.1).
  root.className = clsx(
    styles.root,
    'group/fui-dialog-surface',
    mountedAndClosed && styles['dialog-hidden'],
    root.className,
  );

  if (backdrop) {
    // No marker on the backdrop: one marker per component, on the outermost slot only
    // (D15.1). `styles.backdrop` is unconditional and leads for the same reason as above.
    backdrop.className = clsx(
      styles.backdrop,
      mountedAndClosed && styles['dialog-hidden'],
      isBackdropTransparent && styles['nested-dialog-backdrop'],
      backdrop.className,
    );
  }

  return state;
};

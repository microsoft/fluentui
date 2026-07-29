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

import type { DialogTitleState } from './DialogTitle.types';

import styles from './DialogTitle.module.css';

/**
 * DialogTitle's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. See `dialogSurfaceClassNames` in
 * `../DialogSurface/useDialogSurfaceStyles.styles.ts` for the full rationale, including why
 * this is not tagged `@deprecated`. In short: the `fui-DialogTitle` /
 * `fui-DialogTitle__action` BEM statics are gone (D16.1), the type narrowed to
 * `{ root: string }` so per-slot reads such as `dialogTitleClassNames.action` are compile
 * errors, and the value is a class TOKEN — use `fuiSelector(dialogTitleClassNames.root)` from
 * `@fluentui/react-utilities` to build a selector from it.
 */
export const dialogTitleClassNames: { root: string } = {
  root: 'group/fui-dialog-title',
};

/**
 * Styles to be applied on internal elements used by default action on non-modal Dialog
 *
 * Kept as a zero-argument FUNCTION rather than becoming a bare string constant so its single
 * call site (`useDialogTitle.tsx`, which spends it on the default close `<button>`) and every
 * external consumer of this `@internal` export keep the exact call shape they had when this
 * was a Griffel `makeResetStyles` hook. It no longer calls any React hook, and the class it
 * returns is a compile-time constant.
 *
 * @internal
 */
export const useDialogTitleInternalStyles = (): string => styles['action-button'];

/**
 * Apply styling to the DialogTitle slots based on the state
 */
export const useDialogTitleStyles_unstable = (state: DialogTitleState): DialogTitleState => {
  // ARGUMENT ORDER — `styles.root`, marker, conditional module class, consumer className
  // (DECISIONS.md D16.2). The unconditional hashed module class leads so the marker is never
  // `classList[0]`: nwsapi's `:scope` polyfill builds its anchor from
  // `escape(element.classList[0])`, and the `/` in `group/fui-dialog-title` survives that
  // escaping into an invalid selector, throwing a render-time `AggregateError` under jsdom
  // (DECISIONS.md D15.1). Before D16 the `fui-DialogTitle` static held that position;
  // `styles.root` holds it now.
  //
  // `.root-without-action` wins its `grid-column-end` conflict with the root reset through
  // the layer system (`fui.components.l1` over `fui.base`), not through this argument order
  // — see the mapping table in DialogTitle.module.css.
  state.root.className = clsx(
    styles.root,
    'group/fui-dialog-title',
    !state.action && styles['root-without-action'],
    state.root.className,
  );

  if (state.action) {
    // No marker on the action slot: one marker per component, on the outermost slot only
    // (D15.1). `styles.action` is unconditional and leads for the same reason as above.
    state.action.className = clsx(styles.action, state.action.className);
  }

  return state;
};

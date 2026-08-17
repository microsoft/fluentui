import { clsx } from 'clsx';

import type { DialogTitleState } from './DialogTitle.types';

import styles from './DialogTitle.module.css';

/**
 * DialogTitle's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
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
    dialogTitleClassNames.root,
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

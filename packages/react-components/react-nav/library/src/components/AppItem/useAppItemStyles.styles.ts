import { clsx } from 'clsx';

import type { AppItemState } from './AppItem.types';

import styles from './AppItem.module.css';

/**
 * AppItem's public identity class — the Tailwind named-group marker
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
export const appItemClassNames: { root: string } = {
  root: 'group/fui-app-item',
};

/**
 * Apply styling to the AppItem slots based on the state
 */
export const useAppItemStyles_unstable = (state: AppItemState): AppItemState => {
  const { density, icon } = state;

  // ARGUMENT ORDER — `styles.root`, marker, conditional module classes, consumer className
  // (DECISIONS.md D16.2). The unconditional hashed module class leads so the marker is never
  // `classList[0]`: nwsapi's jsdom `:scope` polyfill builds its anchor from
  // `escape(element.classList[0])` and the `/` survives that escaping into an invalid
  // selector, throwing a render-time `AggregateError` (D15.1). Before D16 the `fui-AppItem`
  // static held that position — it was mergeClasses argument #2, after the reset.
  //
  // `styles.root` is ONE class carrying both the reset (`fui.base`) and this component's own
  // slice (`fui.components.l1`); the two Griffel arguments collapsed because CSS Modules
  // exports one name per local and the layers keep them ordered.
  //
  // Cascade priority is decided by the `@layer fui.*` order in AppItem.module.css, not by the
  // order of these arguments.
  state.root.className = clsx(
    styles.root,
    appItemClassNames.root,
    density === 'small' && styles.small,
    !icon && styles['absent-icon'],
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  return state;
};

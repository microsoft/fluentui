import { clsx } from 'clsx';

import type { AppItemStaticState } from './AppItemStatic.types';

import styles from './AppItemStatic.module.css';

/**
 * AppItemStatic's public identity class — the Tailwind named-group marker
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
export const appItemStaticClassNames: { root: string } = {
  root: 'group/fui-app-item-static',
};

/**
 * Apply styling to the AppItemStatic slots based on the state
 */
export const useAppItemStaticStyles_unstable = (state: AppItemStaticState): AppItemStaticState => {
  const { density, icon } = state;

  // ARGUMENT ORDER — `styles.root`, marker, conditional module classes, consumer className
  // (DECISIONS.md D16.2). The unconditional hashed module class leads so the marker is never
  // `classList[0]`: nwsapi's jsdom `:scope` polyfill builds its anchor from
  // `escape(element.classList[0])` and the `/` survives that escaping into an invalid
  // selector, throwing a render-time `AggregateError` (D15.1). Before D16 the
  // `fui-AppItemStatic` static held that position.
  //
  // `styles.root` is ONE class carrying THREE Griffel arguments (the shared reset in
  // `fui.base`, AppItem's slice and this component's slice in `fui.components.l1`); CSS
  // Modules exports one name per local and the module's block order keeps them ordered.
  state.root.className = clsx(
    styles.root,
    appItemStaticClassNames.root,
    density === 'small' && styles.small,
    !icon && styles['absent-icon'],
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  return state;
};

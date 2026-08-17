import { clsx } from 'clsx';
import type { TeachingPopoverHeaderState } from './TeachingPopoverHeader.types';

import styles from './TeachingPopoverHeader.module.css';

/**
 * TeachingPopoverHeader's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const teachingPopoverHeaderClassNames: { root: string } = {
  root: 'group/fui-teaching-popover-header',
};

/** Applies style classnames to slots */
export const useTeachingPopoverHeaderStyles_unstable = (
  state: TeachingPopoverHeaderState,
): TeachingPopoverHeaderState => {
  const { appearance } = state;
  const isBrand = appearance === 'brand';

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    teachingPopoverHeaderClassNames.root,
    isBrand && styles.brand,
    state.root.className,
  );

  // No marker on the sub-slots: D15.1 puts exactly one marker on the component's OUTERMOST
  // slot. Their classes are this module's own hashed locals.
  if (state.dismissButton) {
    state.dismissButton.className = clsx(
      styles['dismiss-button'],
      isBrand ? styles['dismiss-brand'] : undefined,
      state.dismissButton.className,
    );
  }

  if (state.icon) {
    state.icon.className = clsx(styles.icon, isBrand ? styles['icon-brand'] : undefined, state.icon.className);
  }

  return state;
};

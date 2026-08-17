import { clsx } from 'clsx';
import type { TeachingPopoverTitleState } from './TeachingPopoverTitle.types';

import styles from './TeachingPopoverTitle.module.css';

/**
 * TeachingPopoverTitle's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const teachingPopoverTitleClassNames: { root: string } = {
  root: 'group/fui-teaching-popover-title',
};

/** Applies style classnames to slots */
export const useTeachingPopoverTitleStyles_unstable = (state: TeachingPopoverTitleState): TeachingPopoverTitleState => {
  const { appearance } = state;
  const isBrand = appearance === 'brand';

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    teachingPopoverTitleClassNames.root,
    isBrand && styles.brand,
    state.root.className,
  );

  // No marker on the dismiss button: D15.1 puts exactly one marker on the component's
  // OUTERMOST slot. Its classes are this module's own hashed locals.
  if (state.dismissButton) {
    state.dismissButton.className = clsx(
      styles['dismiss-button'],
      isBrand ? styles['dismiss-brand'] : undefined,
      state.dismissButton.className,
    );
  }

  return state;
};

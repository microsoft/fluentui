import { clsx } from 'clsx';
import type { TeachingPopoverFooterState } from './TeachingPopoverFooter.types';

import styles from './TeachingPopoverFooter.module.css';

/**
 * TeachingPopoverFooter's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * The two button slots keep their styling — it now travels as hashed module classes composed
 * onto the slot objects this hook already holds (D16.3's M2), which is why removing their
 * public class handles costs nothing.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const teachingPopoverFooterClassNames: { root: string } = {
  root: 'group/fui-teaching-popover-footer',
};

/** Applies style classnames to slots */
export const useTeachingPopoverFooterStyles_unstable = (
  state: TeachingPopoverFooterState,
): TeachingPopoverFooterState => {
  const { appearance, footerLayout } = state;
  const isHorizontal = footerLayout === 'horizontal';

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    teachingPopoverFooterClassNames.root,
    isHorizontal ? styles.horizontal : styles.vertical,
    state.root.className,
  );

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  if (state.secondary) {
    state.secondary.className = clsx(
      isHorizontal ? styles['button-horizontal'] : styles['button-vertical'],
      appearance === 'brand' ? styles['brand-secondary'] : undefined,
      state.secondary.className,
    );
  }

  state.primary.className = clsx(
    isHorizontal ? styles['button-horizontal'] : styles['button-vertical'],
    appearance === 'brand' ? styles['brand-primary'] : undefined,
    state.primary.className,
  );

  return state;
};

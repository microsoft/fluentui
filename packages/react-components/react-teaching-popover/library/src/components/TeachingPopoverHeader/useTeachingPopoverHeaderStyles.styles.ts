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
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + teachingPopoverHeaderClassNames.root` is invalid CSS. Use
 * `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5);
 * `element.classList.contains(...)` is token-taking and needs no escaping.
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

  // Module class FIRST, named group marker second, consumer className last (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so index 0 is always the hashed, selector-safe
  // `fuicm-*` token — which is what keeps the marker off `classList[0]`, where nwsapi's
  // `:scope` polyfill would throw on its `/` under jsdom (D15.1).
  //
  // `appearance` is a LOOK prop and stays a JS-side gate selecting a module class (D3); no
  // `data-appearance` is stamped, because this hook composes all three slot classNames itself
  // and nothing has to read the value from a selector (D15.6, resolved).
  //
  // Cascade priority is decided by the `@layer fui.*` order and by file position inside
  // TeachingPopoverHeader.module.css, not by the order of these arguments.
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

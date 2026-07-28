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
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SplitButtonSlots, SplitButtonState } from './SplitButton.types';

import styles from './SplitButton.module.css';

export const splitButtonClassNames: SlotClassNames<SplitButtonSlots> = {
  root: 'fui-SplitButton',
  menuButton: 'fui-SplitButton__menuButton',
  primaryActionButton: 'fui-SplitButton__primaryActionButton',
};

export const useSplitButtonStyles_unstable = (state: SplitButtonState): SplitButtonState => {
  const { appearance, disabled, disabledFocusable } = state;
  const disabledAny = disabled || disabledFocusable;

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. `styles.root` is
  // unconditional, so it will keep a selector-safe token ahead of the marker once the
  // statics are removed (statics-removal-design.md §4a).
  //
  // Unlike the rest of the family this root is SplitButton's own `<div>`, not a Button, so
  // `group/fui-split-button` is the only marker on it; `group/fui-button` and
  // `group/fui-menu-button` sit on the two children.
  //
  // Cascade priority is decided by the `@layer fui.*` order in SplitButton.module.css —
  // the wrapper's own declarations are `fui.components.l1`, everything that lands on the
  // two child buttons is `fui.components.l2`. See that file's header.
  state.root.className = clsx(
    splitButtonClassNames.root,
    'group/fui-split-button',
    styles.root,
    appearance && styles[appearance],
    disabledAny && styles.disabled,
    disabledAny && styles['disabled-high-contrast'],
    state.root.className,
  );

  // The two child slots each carry exactly ONE module class: it is both the focus-indicator
  // slice (`useFocusStyles.*`) and the handle the root's own rules select through, which is
  // what replaces the `.fui-SplitButton__*` static-class selectors the Griffel source used.
  if (state.menuButton) {
    state.menuButton.className = clsx(
      splitButtonClassNames.menuButton,
      styles['menu-button'],
      state.menuButton.className,
    );
  }

  if (state.primaryActionButton) {
    state.primaryActionButton.className = clsx(
      splitButtonClassNames.primaryActionButton,
      styles['primary-action-button'],
      state.primaryActionButton.className,
    );
  }

  return state;
};

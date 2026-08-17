import { clsx } from 'clsx';
import type { SplitButtonState } from './SplitButton.types';

import styles from './SplitButton.module.css';

/**
 * Public identity classes for SplitButton.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * (the Tailwind named-group marker, DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. The per-slot `menuButton` / `primaryActionButton` keys were
 * removed in D16.5; there is no public class-name handle on component internals. Those two
 * children are themselves components and carry their own markers — `group/fui-menu-button`
 * and `group/fui-button`.
 *
 * `'.' + splitButtonClassNames.root` is an invalid *selector* — the `/` terminates the class
 * name. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const splitButtonClassNames: { root: string } = {
  root: 'group/fui-split-button',
};

export const useSplitButtonStyles_unstable = (state: SplitButtonState): SplitButtonState => {
  const { appearance, disabled, disabledFocusable } = state;
  const disabledAny = disabled || disabledFocusable;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    splitButtonClassNames.root,
    appearance && styles[appearance],
    disabledAny && styles.disabled,
    disabledAny && styles['disabled-high-contrast'],
    state.root.className,
  );

  // The two child slots each carry exactly ONE module class: it is both the focus-indicator
  // slice (`useFocusStyles.*`) and the handle the root's own rules select through, which is
  // what replaced the `.fui-SplitButton__*` static-class selectors the Griffel source used —
  // and why removing those statics (D16.1) needed no selector change here.
  if (state.menuButton) {
    state.menuButton.className = clsx(styles['menu-button'], state.menuButton.className);
  }

  if (state.primaryActionButton) {
    state.primaryActionButton.className = clsx(styles['primary-action-button'], state.primaryActionButton.className);
  }

  return state;
};

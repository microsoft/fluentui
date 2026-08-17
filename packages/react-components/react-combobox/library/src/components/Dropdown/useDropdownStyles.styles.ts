import { clsx } from 'clsx';
import type { DropdownState } from './Dropdown.types';

import styles from './Dropdown.module.css';

/**
 * Public identity class for Dropdown.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target. The per-slot keys (`button`, `clearButton`, `expandIcon`,
 * `listbox`) were removed together with the `fui-Dropdown__*` BEM statics
 * (DECISIONS.md D16.1/D16.5): there is no public class-name handle on component internals.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const dropdownClassNames: { root: string } = {
  root: 'group/fui-dropdown',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant` catalog in
 * `@fluentui/react-tailwind-theme` (`css/variants.css`).
 */
type DropdownRootDataAttributes = {
  'data-size': DropdownState['size'];
  'data-disabled'?: true;
  'data-invalid'?: true;
};

/**
 * Apply styling to the Dropdown slots based on the state
 */
export const useDropdownStyles_unstable = (state: DropdownState): DropdownState => {
  const { appearance, open, placeholderVisible, showClearButton } = state;
  const invalid = `${state.button['aria-invalid']}` === 'true';
  const disabled = state.button.disabled;

  const root = state.root as DropdownState['root'] & DropdownRootDataAttributes;

  root['data-size'] = state.size;
  root['data-disabled'] = disabled || undefined;
  root['data-invalid'] = invalid || undefined;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, dropdownClassNames.root, styles[appearance], state.root.className);

  state.button.className = clsx(styles.button, placeholderVisible && styles.placeholder, state.button.className);

  if (state.listbox) {
    // The listbox slot is a `<Listbox>`; these rules sit in `fui.components.l2` so they beat
    // that component's own `fui.components.l1` rules (DECISIONS.md D2 amendment 2).
    state.listbox.className = clsx(
      styles.listbox,
      state.inlinePopup && styles['inline-listbox'],
      !open && styles['listbox-collapsed'],
      state.listbox.className,
    );
  }

  if (state.expandIcon) {
    state.expandIcon.className = clsx(styles.icon, showClearButton && styles.hidden, state.expandIcon.className);
  }

  if (state.clearButton) {
    // `styles['clear-button']` is the makeResetStyles replacement (`@layer fui.base`) and is
    // also the class the root's `:has(.clear-button:focus)` rule keys on — an OWN sub-slot,
    // composed in JS rather than exposed as a global handle (DECISIONS.md D16.3).
    state.clearButton.className = clsx(
      styles['clear-button'],
      styles.icon,
      !showClearButton && styles.hidden,
      state.clearButton.className,
    );
  }

  return state;
};

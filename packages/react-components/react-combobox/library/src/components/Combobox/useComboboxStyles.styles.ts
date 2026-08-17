import { clsx } from 'clsx';
import type { ComboboxState } from './Combobox.types';

import styles from './Combobox.module.css';

/**
 * Public identity class for Combobox.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target. The per-slot keys (`input`, `expandIcon`, `clearIcon`, `listbox`)
 * were removed together with the `fui-Combobox__*` BEM statics (DECISIONS.md D16.1/D16.5):
 * there is no public class-name handle on component internals.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const comboboxClassNames: { root: string } = {
  root: 'group/fui-combobox',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant` catalog in
 * `@fluentui/react-tailwind-theme` (`css/variants.css`).
 */
type ComboboxRootDataAttributes = {
  'data-size': ComboboxState['size'];
  'data-disabled'?: true;
  'data-invalid'?: true;
};

/**
 * Apply styling to the Combobox slots based on the state
 */
export const useComboboxStyles_unstable = (state: ComboboxState): ComboboxState => {
  const { appearance, open, size, showClearIcon } = state;
  const invalid = `${state.input['aria-invalid']}` === 'true';
  const disabled = state.input.disabled;

  const root = state.root as ComboboxState['root'] & ComboboxRootDataAttributes;

  root['data-size'] = size;
  root['data-disabled'] = disabled || undefined;
  root['data-invalid'] = invalid || undefined;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, comboboxClassNames.root, styles[appearance], state.root.className);

  state.input.className = clsx(styles.input, state.input.className);

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

  // Both icon slots take the identical class list but for the trailing state class, the way
  // mergeClasses handed them the identical atomics — one `.icon` class covers both.
  if (state.expandIcon) {
    state.expandIcon.className = clsx(
      styles.icon,
      showClearIcon && styles['visually-hidden'],
      state.expandIcon.className,
    );
  }

  if (state.clearIcon) {
    state.clearIcon.className = clsx(styles.icon, !showClearIcon && styles.hidden, state.clearIcon.className);
  }

  return state;
};

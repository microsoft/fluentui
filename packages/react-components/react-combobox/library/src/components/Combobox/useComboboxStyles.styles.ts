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
 * The value is a class TOKEN, not a selector — `'.' + comboboxClassNames.root` is invalid CSS,
 * because the `/` must be escaped in a selector. Use `fuiSelector(comboboxClassNames.root)`
 * from `@fluentui/react-utilities` (DECISIONS.md D16.5).
 */
export const comboboxClassNames: { root: string } = {
  root: 'group/fui-combobox',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * All three live on the ROOT even though most of the rules they drive target the `input` and
 * icon slots: that is the headless preview's convention (every `data-*` it stamps is on the
 * root — reports/headless-precedent.md), and it is what lets Combobox.module.css reach the
 * inner slots with `& .input` / `& .icon` descendant selectors instead of duplicating the
 * attributes onto every slot.
 *
 * Presence flags are written `flag || undefined`: React omits an attribute whose value is
 * `undefined`, whereas `false` would render `data-invalid="false"` and still match
 * `[data-invalid]`.
 *
 * `data-disabled` and `data-invalid` mirror `state.input.disabled` / the input's
 * `aria-invalid`, neither of which the ROOT can express natively — the root is a `<div>` and
 * only the inner `<input>` carries those. That is precisely the case DECISIONS.md D15.6
 * reserves mirroring for.
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

  // `styles.root` first — hashed, unconditional and selector-safe — then the named group
  // marker, which must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1/D16.2) — with the consumer className last. The `fui-Combobox*`
  // BEM statics that used to lead this list are gone (D16.1); the marker is Combobox's sole
  // public identity class now, and the only handle by which another module can style an
  // element from this Combobox's state, because `styles.root` is hashed and unaddressable
  // from outside this file.
  //
  // Cascade priority is decided by the `@layer fui.*` order and by block order inside
  // Combobox.module.css, not by the order of these arguments — see that file's header for the
  // mapping back to the mergeClasses() argument order this replaces, including the three
  // inversions (`outlineInteractive`'s bucket order, its focus-within/hover/active ordering,
  // and the split `invalid` specificity hack).
  //
  // The `!disabled &&` guard on `outlineInteractive` is now an `@variant enabled` block inside
  // `.outline`; `appearance === 'outline' | 'underline'` is the appearance class itself; and
  // `invalid && appearance !== 'underline'` is `@variant invalid` on the three non-underline
  // appearance classes.
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

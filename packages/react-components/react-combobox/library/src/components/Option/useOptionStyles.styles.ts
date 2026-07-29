import { clsx } from 'clsx';
import type { OptionState } from './Option.types';

import styles from './Option.module.css';

/**
 * Public identity class for Option.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target. The `checkIcon` key was removed together with the
 * `fui-Option__checkIcon` BEM static (DECISIONS.md D16.1/D16.5): there is no public
 * class-name handle on component internals.
 *
 * The value is a class TOKEN, not a selector — `'.' + optionClassNames.root` is invalid CSS,
 * because the `/` must be escaped in a selector. Use `fuiSelector(optionClassNames.root)` from
 * `@fluentui/react-utilities` (DECISIONS.md D16.5). Token-taking DOM APIs need no escaping,
 * which is why `react-tag-picker`'s `el.classList.contains(optionClassNames.root)` keeps
 * working unchanged.
 */
export const optionClassNames: { root: string } = {
  root: 'group/fui-option',
};

/**
 * Apply styling to the Option slots based on the state
 */
export const useOptionStyles_unstable = (state: OptionState): OptionState => {
  const { disabled, multiselect, selected } = state;

  // `styles.root` first — hashed, unconditional and selector-safe — then the named group
  // marker, which must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1/D16.2) — with the consumer className last. The invariant also
  // holds when `react-tag-picker`'s `useTagPickerOptionStyles_unstable` calls this hook after
  // composing its own class list: this call re-leads the string with `styles.root`.
  //
  // No `data-*` mirror is minted. Every state the module reads is already expressed on this
  // element natively: `aria-disabled` (matched by the shared `disabled-control` /
  // `enabled-control` variants) and `data-activedescendant-focusvisible` (written by
  // `@fluentui/react-aria`). DECISIONS.md D15.6 — mirror only what a native selector cannot
  // reach. `multiselect` / `selected` drive the check icon's own classes below, and the
  // check icon is a child this hook holds the slot object for, so it needs no group variant.
  //
  // Cascade priority is decided by the `@layer fui.*` order and by block order inside
  // Option.module.css, not by the order of these arguments — see that file's header for the
  // mapping back to the mergeClasses() argument order this replaces.
  //
  // `!disabled && styles.interactive` and `disabled && styles.disabled` are now the
  // `enabled-control` / `disabled-control` variants on `.root`; `selected && styles.selected`
  // is deleted outright because the compiled `selected` slice is `{}` — it applied nothing
  // before and applies nothing now.
  state.root.className = clsx(styles.root, 'group/fui-option', state.root.className);

  if (state.checkIcon) {
    state.checkIcon.className = clsx(
      styles['check-icon'],
      multiselect && styles['multiselect-check'],
      selected && styles['selected-check'],
      selected && multiselect && styles['selected-multiselect-check'],
      disabled && styles['check-disabled'],
      disabled && multiselect && styles['multiselect-check-disabled'],
      state.checkIcon.className,
    );
  }

  return state;
};

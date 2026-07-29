import { clsx } from 'clsx';
import type { CheckboxState } from './Checkbox.types';

import styles from './Checkbox.module.css';

/**
 * Checkbox's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-Checkbox` / `fui-Checkbox__<slot>` BEM statics are gone (D16.1), and the type has
 * narrowed from `SlotClassNames<CheckboxSlots>` to `{ root: string }` so that a read of
 * `label`, `input` or `indicator` is a compile error on the exact line that would otherwise
 * have silently stopped matching.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + checkboxClassNames.root` is invalid CSS. Use
 * `fuiSelector(checkboxClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's three, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const checkboxClassNames: { root: string } = {
  root: 'group/fui-checkbox',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`). Every name comes from
 * the existing catalog vocabulary (reports/headless-precedent.md for `data-size` /
 * `data-label-position` / `data-disabled`; `data-checked` and `data-indeterminate` are the
 * catalog's generic state pair).
 *
 * All of them live on the ROOT even though they select styles for the input, indicator and
 * label slots: those slots are the root's children, so one stamp drives every descendant
 * rule (same approach as react-button's `data-size` → `.root … & .icon`).
 *
 * `checked` is TRI-state (`true | false | 'mixed'`), so it needs two presence attributes
 * rather than one: `data-checked` for the boolean-true branch and `data-indeterminate` for
 * `'mixed'`. Presence flags are written `flag || undefined` — React omits an attribute
 * whose value is `undefined`, whereas `false` would render `data-checked="false"` and still
 * match `[data-checked]`. The unchecked branch is therefore the `not-checked` AND
 * `not-indeterminate` complement in the module, not a third attribute.
 *
 * Both flags reflect the CHECKED state alone and are stamped even while disabled; the
 * module gates the checked/mixed/unchecked rule blocks on `enabled` instead, which is what
 * reproduces the Griffel hook's `disabled ? … : mixed ? … : checked ? … : unchecked`
 * ternary chain (see Checkbox.module.css's header for why that gate is load-bearing).
 *
 * `data-label-position` is stamped UNCONDITIONALLY here, unlike react-switch's. Checkbox's
 * `inputStyles[labelPosition]` slice is applied with no `label &&` gate, so the attribute
 * has to be present even on a label-less Checkbox; the label-slot rules that also read it
 * are inert without a `.label` element to match.
 */
type CheckboxRootDataAttributes = {
  'data-size': CheckboxState['size'];
  'data-label-position': CheckboxState['labelPosition'];
  'data-checked'?: true;
  'data-indeterminate'?: true;
  'data-disabled'?: true;
};

/**
 * Apply styling to the Checkbox slots based on the state
 */
export const useCheckboxStyles_unstable = (state: CheckboxState): CheckboxState => {
  const { checked, disabled, labelPosition, shape, size } = state;

  const root = state.root as CheckboxState['root'] & CheckboxRootDataAttributes;

  root['data-size'] = size;
  root['data-label-position'] = labelPosition;
  root['data-checked'] = checked === true || undefined;
  root['data-indeterminate'] = checked === 'mixed' || undefined;
  root['data-disabled'] = disabled || undefined;

  // Module class FIRST, named group marker second, consumer className last (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so index 0 is always the hashed, selector-safe
  // `fuicm-*` token — which is what keeps the marker off `classList[0]`, where nwsapi's
  // `:scope` polyfill would throw on its `/` under jsdom (D15.1). The BEM static that used
  // to lead this call is gone (D16.1): the marker is now Checkbox's SOLE public identity
  // class, and the only handle by which another module — in this package or any other — can
  // style an element from this Checkbox's state, because `styles.root` is hashed and
  // unaddressable from outside this file (DECISIONS.md D15).
  //
  // Checkbox needs no state mirrors and is in fact D15's WORKED PRECEDENT for them: the
  // real checked/indeterminate/disabled state lives on the hidden `<input>`, and this hook
  // has always hoisted it onto the root as presence attributes (above), which is exactly
  // what a descendant needs in order to read it. `@variant group-checked/fui-checkbox`,
  // `group-disabled/fui-checkbox` and friends therefore work as-is (D15.6, Tier 0).
  //
  // Cascade priority is decided by the `@layer fui.*` order in Checkbox.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including why the `label` slot's rules
  // sit at altitude `fui.components.l2` (they are applied over @fluentui/react-label's own
  // hook output).
  state.root.className = clsx(styles.root, 'group/fui-checkbox', state.root.className);

  state.input.className = clsx(styles.input, state.input.className);

  if (state.indicator) {
    state.indicator.className = clsx(
      styles.indicator,
      shape === 'circular' && styles.circular,
      state.indicator.className,
    );
  }

  if (state.label) {
    state.label.className = clsx(styles.label, state.label.className);
  }

  return state;
};

'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike most converted styles files, this one carries NO `enforce-use-client` suppression —
 * it still delegates to another package's client styles hook, so the rule agrees `'use client'`
 * is required here and a suppression would itself be reported as an unused disable directive.
 *
 * Where the rule DOES object (a styles file whose remaining content is `clsx` plus a
 * CSS-Modules import), the suppression is a TRAILING `eslint-disable-line`, because a leading
 * block comment would push `'use client'` off line 1 of the emitted lib/lib-commonjs output.
 * Dropping the directives altogether is a Phase 3 sweep across all 180 style hooks.
 */

import { clsx } from 'clsx';
import type { TagPickerOptionGroupState } from './TagPickerOptionGroup.types';
import { useOptionGroupStyles_unstable } from '@fluentui/react-combobox';

import styles from './TagPickerOptionGroup.module.css';

/**
 * Public identity class for TagPickerOptionGroup.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target. The `label` key was removed together with the
 * `fui-TagPickerOptionGroup__label` BEM static (DECISIONS.md D16.1/D16.5): there is no public
 * class-name handle on component internals.
 *
 * Note this root ALSO carries `optionGroupClassNames.root` (`group/fui-option-group`), because
 * a TagPickerOptionGroup IS an OptionGroup — the delegation to `useOptionGroupStyles_unstable`
 * below stamps it on this same element. `group/fui-tag-picker-option-group` narrows to this
 * subtype.
 *
 * The value is a class TOKEN, not a selector — `'.' + tagPickerOptionGroupClassNames.root` is
 * invalid CSS, because the `/` must be escaped in a selector. Use
 * `fuiSelector(tagPickerOptionGroupClassNames.root)` from `@fluentui/react-utilities`.
 */
export const tagPickerOptionGroupClassNames: { root: string } = {
  root: 'group/fui-tag-picker-option-group',
};

/**
 * Apply styling to the TagPickerOptionGroup slots based on the state
 */
export const useTagPickerOptionGroupStyles = (state: TagPickerOptionGroupState): TagPickerOptionGroupState => {
  // Delegation FIRST, exactly as before: `useOptionGroupStyles_unstable` styles the root and the
  // `label` slot and stamps its own `group/fui-option-group` marker, leaving the consumer
  // className trailing. Everything this hook adds is prepended to that string below, so the
  // consumer's className stays last overall.
  state = useOptionGroupStyles_unstable(state);

  // `styles.root` is the identity-only local minted in TagPickerOptionGroup.module.css: this
  // component has no styles of its own, and leading with it keeps the D15.1 / D16.2 invariant
  // — the marker is never `classList[0]`, where nwsapi's jsdom `:scope` polyfill would splice
  // the `/` into an invalid selector — a property of THIS file rather than of react-combobox's
  // hook. Consumer className stays last.
  state = {
    ...state,
    root: { ...state.root, className: clsx(styles.root, 'group/fui-tag-picker-option-group', state.root.className) },
  };

  // The `label` slot deliberately gets NO assignment here. Its only library token was the
  // `fui-TagPickerOptionGroup__label` static; this component has no module class for it
  // (react-combobox's OptionGroup hook is what styles the label). Keeping
  // `clsx(state.label.className)` would be an identity on the consumer's own string and would
  // imply this hook styles a slot it does not (CONVERSION_GUIDE, "a slot whose only library
  // token is the static").

  return state;
};

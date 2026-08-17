import { clsx } from 'clsx';
import type { TextareaState } from './Textarea.types';

import styles from './Textarea.module.css';

/**
 * Public identity classes for Textarea.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM statics (`fui-Textarea`,
 * `fui-Textarea__textarea`) are no longer rendered and the per-slot keys are gone; there is
 * no public class-name handle on component internals.
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + textareaClassNames.root` is an invalid selector even
 * though it type-checks. Use `fuiSelector(textareaClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const textareaClassNames: { root: string } = {
  root: 'group/fui-textarea',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant` catalog in
 * `@fluentui/react-tailwind-theme` (`css/variants.css`).
 */
type TextareaRootDataAttributes = {
  'data-disabled'?: true;
  'data-invalid'?: true;
};

/**
 * `size` is a scale prop, so it rides a data-attribute rather than a module class (D3).
 * It is stamped on the `textarea` slot because that is the slot its styles apply to.
 */
type TextareaDataAttributes = {
  'data-size': TextareaState['size'];
};

/**
 * Apply styling to the Textarea slots based on the state
 */
export const useTextareaStyles_unstable = (state: TextareaState): TextareaState => {
  const { size, appearance, resize } = state;
  const disabled = state.textarea.disabled;
  const invalid = `${state.textarea['aria-invalid']}` === 'true';
  const filled = appearance.startsWith('filled');

  const root = state.root as TextareaState['root'] & TextareaRootDataAttributes;
  const textarea = state.textarea as TextareaState['textarea'] & TextareaDataAttributes;

  root['data-disabled'] = disabled || undefined;
  // `!disabled &&` mirrors the arg-#8 condition: a disabled Textarea never gets the
  // invalid border, even with aria-invalid set.
  root['data-invalid'] = (!disabled && invalid) || undefined;

  textarea['data-size'] = size;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    textareaClassNames.root,
    !disabled && filled && styles.filled,
    !disabled && styles[appearance],
    state.root.className,
  );

  state.textarea.className = clsx(styles.textarea, styles[resize], state.textarea.className);

  return state;
};

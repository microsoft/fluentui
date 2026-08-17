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
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * Both are *presence* selectors, so the flags are written as `flag || undefined` — React
 * omits an attribute whose value is `undefined`, whereas `false` would render
 * `data-disabled="false"` and still match `[data-disabled]`.
 *
 * The root is a plain `<span>` wrapper: it carries neither the native `disabled` attribute
 * nor `aria-invalid` (both live on the `textarea` slot), so the two conditions the Griffel
 * hook branched on have to be mirrored onto it explicitly. `data-disabled` also drives the
 * `enabled` variant that gates the focus-underline block (`!disabled &&
 * rootStyles.interactive`).
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

  // Unconditional module class FIRST, then the named group marker — the marker must never be
  // `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md D15.1 /
  // D16.2) — with the consumer className last. `styles.root` is unconditional and clsx never
  // drops it, so index 0 is always the hashed, selector-safe module class; it is what keeps
  // the marker safe now that the `fui-Textarea` static is gone.
  // The marker is a literal, unhashed,
  // GLOBAL token: it is the only handle by which another module — in this package or any other
  // — can style an element from this Textarea's state, because `styles.root` is hashed and
  // unaddressable from outside this file. Textarea needs no state mirrors: `data-disabled` and
  // `data-invalid` are already stamped on this very element above, so
  // `@variant group-invalid/fui-textarea`, `group-focus-within/fui-textarea` etc. work as-is
  // (DECISIONS.md D15, Tier 0 — the optional Tier 2 `data-focused` is deliberately skipped:
  // `:focus-within` on this root already reaches every descendant through the group).
  // `data-size` stays on the `textarea` slot, where its rules apply; that slot is a descendant
  // of this marker.
  //
  // Cascade priority is decided by the `@layer fui.*` order in Textarea.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including the `outlineInteractive`
  // bucket-order inversion.
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

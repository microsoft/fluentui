import { clsx } from 'clsx';
import type { FieldState } from './Field.types';

import styles from './Field.module.css';

/**
 * Field's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * The `label` / `validationMessage` / `validationMessageIcon` / `hint` keys are gone along
 * with the `fui-Field*` BEM statics (D16.1), and the type has narrowed from
 * `SlotClassNames<FieldSlots>` to `{ root: string }` so that any read of a per-slot key is a
 * compile error on the exact line that would otherwise have silently stopped matching.
 *
 * NOTE FOR SWEEPS AND CODEMODS: the five removed statics were declared as backtick template
 * literals rather than single-quoted strings, so a scan keyed on a single quote followed by
 * fui- reported this file as having no statics at all. Match all three quote characters.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const fieldClassNames: { root: string } = {
  root: 'group/fui-field',
};

/**
 * Data attributes rendered on the ROOT slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`). Both names come from
 * the headless preview's vocabulary (reports/headless-precedent.md) and both already
 * existed in the catalog — this conversion adds no new variant.
 *
 * They live on the root even though every rule they select styles the `label` slot: the
 * label is the root's child, so one stamp drives all the descendant rules (same approach
 * as react-switch's `data-size` → `.root … & .label`).
 *
 * `data-size` must NOT be stamped on the label slot itself. That element is the <Label>
 * from `@fluentui/react-label`, whose own styles hook writes `data-size` from the
 * label's OWN `size` prop — a consumer may override it (`<Field size="medium"
 * label={{ size: 'small' }} />`) while Field's label rules must keep reading Field's
 * `size`, exactly as the Griffel hook did.
 */
type FieldRootDataAttributes = {
  'data-orientation': FieldState['orientation'];
  'data-size': FieldState['size'];
};

/**
 * `validationState` selects a colour and nothing else — the same shape as ProgressBar's
 * `color` — so it rides module classes rather than a data-attribute (DECISIONS.md D3).
 * This map preserves the Griffel hook's `validationMessageIconStyles[validationState]`
 * lookup, including the `none` branch that resolves to no class at all.
 */
const validationMessageIconStyles = {
  error: styles['validation-message-icon-error'],
  warning: styles['validation-message-icon-warning'],
  success: styles['validation-message-icon-success'],
  none: undefined,
} as const;

/**
 * Apply styling to the Field slots based on the state
 */
export const useFieldStyles_unstable = (state: FieldState): FieldState => {
  const { validationState, size } = state;
  const horizontal = state.orientation === 'horizontal';

  const root = state.root as FieldState['root'] & FieldRootDataAttributes;

  root['data-orientation'] = state.orientation;
  root['data-size'] = size;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    fieldClassNames.root,
    horizontal && !state.label && styles['horizontal-no-label'],
    state.root.className,
  );

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  if (state.label) {
    state.label.className = clsx(styles.label, state.label.className);
  }

  if (state.validationMessageIcon) {
    state.validationMessageIcon.className = clsx(
      styles['validation-message-icon'],
      validationMessageIconStyles[validationState],
      state.validationMessageIcon.className,
    );
  }

  if (state.validationMessage) {
    state.validationMessage.className = clsx(
      styles['secondary-text'],
      validationState === 'error' && styles['secondary-text-error'],
      !!state.validationMessageIcon && styles['secondary-text-with-icon'],
      state.validationMessage.className,
    );
  }

  if (state.hint) {
    state.hint.className = clsx(styles['secondary-text'], state.hint.className);
  }

  return state;
};

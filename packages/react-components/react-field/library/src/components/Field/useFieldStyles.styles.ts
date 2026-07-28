'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeStyles` is
 * gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { FieldSlots, FieldState } from './Field.types';

import styles from './Field.module.css';

export const fieldClassNames: SlotClassNames<FieldSlots> = {
  root: `fui-Field`,
  label: `fui-Field__label`,
  validationMessage: `fui-Field__validationMessage`,
  validationMessageIcon: `fui-Field__validationMessageIcon`,
  hint: `fui-Field__hint`,
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

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this Field's state, because `styles.root` is
  // hashed and unaddressable from outside this file. Field is the natural consumer of this
  // capability: it wraps an ARBITRARY control from another package, and that control's own
  // module can now read Field's `data-orientation` / `data-size` as
  // `@variant group-size-small/fui-field { … }` rather than needing the value threaded
  // through props (DECISIONS.md D15).
  //
  // Cascade priority is decided by the `@layer fui.*` order in Field.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including why the `label` slot's rules
  // sit at altitude `fui.components.l2` (they are applied over @fluentui/react-label's
  // own hook output).
  state.root.className = clsx(
    fieldClassNames.root,
    'group/fui-field',
    styles.root,
    horizontal && !state.label && styles['horizontal-no-label'],
    state.root.className,
  );

  if (state.label) {
    state.label.className = clsx(fieldClassNames.label, styles.label, state.label.className);
  }

  if (state.validationMessageIcon) {
    state.validationMessageIcon.className = clsx(
      fieldClassNames.validationMessageIcon,
      styles['validation-message-icon'],
      validationMessageIconStyles[validationState],
      state.validationMessageIcon.className,
    );
  }

  if (state.validationMessage) {
    state.validationMessage.className = clsx(
      fieldClassNames.validationMessage,
      styles['secondary-text'],
      validationState === 'error' && styles['secondary-text-error'],
      !!state.validationMessageIcon && styles['secondary-text-with-icon'],
      state.validationMessage.className,
    );
  }

  if (state.hint) {
    state.hint.className = clsx(fieldClassNames.hint, styles['secondary-text'], state.hint.className);
  }

  return state;
};

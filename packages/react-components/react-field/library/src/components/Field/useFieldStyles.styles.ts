import { clsx } from 'clsx';
import type { FieldState } from './Field.types';

import styles from './Field.module.css';

/**
 * Field's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target — the
 * one Field cares most about, since it wraps an arbitrary control whose own module reads
 * Field's `data-orientation` / `data-size` through `@variant group-size-small/fui-field`.
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
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + fieldClassNames.root` is invalid CSS. Use
 * `fuiSelector(fieldClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
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

  // ARGUMENT ORDER — `styles.root`, marker, conditional module classes, consumer className
  // (DECISIONS.md D16.2). The unconditional hashed module class leads so the marker is never
  // `classList[0]`: nwsapi's `:scope` polyfill builds its anchor from
  // `escape(element.classList[0])`, and the `/` in `group/fui-field` survives that escaping
  // into an invalid selector, throwing a render-time `AggregateError` under jsdom
  // (DECISIONS.md D15.1). Before D16 the `fui-Field` static held that position; `styles.root`
  // holds it now. `styles['horizontal-no-label']` cannot: it is conditional.
  //
  // The marker is a literal, unhashed, GLOBAL token — written literally rather than read back
  // out of `fieldClassNames` — and is the only handle by which another module, in this package
  // or any other, can style an element from this Field's state, because `styles.root` is
  // hashed and unaddressable from outside this file. Field is the natural consumer of this
  // capability: it wraps an ARBITRARY control from another package, and that control's own
  // module can read Field's `data-orientation` / `data-size` as
  // `@variant group-size-small/fui-field { … }` rather than needing the value threaded
  // through props (DECISIONS.md D15).
  //
  // Cascade priority is decided by the `@layer fui.*` order in Field.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including why the `label` slot's rules
  // sit at altitude `fui.components.l2` (they are applied over @fluentui/react-label's
  // own hook output).
  state.root.className = clsx(
    styles.root,
    fieldClassNames.root,
    horizontal && !state.label && styles['horizontal-no-label'],
    state.root.className,
  );

  // Sub-slots carry no marker, so D15.1 is not in play: the hashed module class simply leads
  // and the consumer className stays last (DECISIONS.md D16.1 — no public class-name handle
  // on component internals).
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

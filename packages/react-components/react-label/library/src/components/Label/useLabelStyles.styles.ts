import { clsx } from 'clsx';
import type { LabelState } from './Label.types';

import styles from './Label.module.css';

/**
 * Public identity class for Label.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. The `required` key was removed along with the BEM statics
 * (DECISIONS.md D16.1 / D16.5): there is no public class-name handle on component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + labelClassNames.root` is an invalid selector. Use `fuiSelector(labelClassNames.root)`
 * from `@fluentui/react-utilities` at every selector site (DECISIONS.md D16.5).
 */
export const labelClassNames: { root: string } = {
  root: 'group/fui-label',
};

/**
 * Data attributes rendered on the Label slots and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `size` is a scale prop, so it rides `data-size` rather than a module class
 * (DECISIONS.md D3); `weight` is a look prop and stays a module class (`.semibold`),
 * which also keeps the "regular" default rule-free exactly as the Griffel source was.
 *
 * `data-disabled` is a *presence* selector, so the flag is written `disabled || undefined`
 * — React omits an attribute whose value is `undefined`, whereas `false` would render
 * `data-disabled="false"` and still match `[data-disabled]`.
 *
 * It is stamped on BOTH slots because the single Griffel `disabled` slice was applied to
 * both by mergeClasses; keying the required slot off its own attribute (rather than a
 * descendant selector from the root) keeps `.required` independent of DOM nesting and
 * every selector `:where()`-flat.
 */
type LabelRootDataAttributes = {
  'data-size': LabelState['size'];
  'data-disabled'?: true;
};

type LabelRequiredDataAttributes = {
  'data-disabled'?: true;
};

/**
 * Apply styling to the Label slots based on the state
 */
export const useLabelStyles_unstable = (state: LabelState): LabelState => {
  const { disabled, size, weight } = state;

  const root = state.root as LabelState['root'] & LabelRootDataAttributes;

  root['data-size'] = size;
  root['data-disabled'] = disabled || undefined;

  // Unconditional module class FIRST, then the named group marker, then the conditional
  // module classes, with the consumer className last (DECISIONS.md D16.2). The marker must
  // never be `classList[0]` — nwsapi's `:scope` polyfill throws on it under jsdom
  // (DECISIONS.md D15.1) — and `styles.root` is the token that guarantees it, since clsx
  // never drops an unconditional argument. The BEM static that used to hold that position
  // is gone (DECISIONS.md D16.1).
  //
  // The marker is a literal, unhashed, GLOBAL token and now the component's SOLE public
  // identity class: it is the only handle by which another module — in this package or any
  // other — can style an element from this Label's state, because `styles.root` is hashed
  // and unaddressable from outside this file. Label needs no state mirrors: `data-size` and
  // `data-disabled` are already stamped on this very element above, so
  // `@variant group-disabled/fui-label` works as-is (DECISIONS.md D15, Tier 0).
  //
  // Only the root carries a marker. The `required` slot gets none: a group cannot style
  // itself, and `required` has its own `data-disabled` for its own rules.
  //
  // Cascade priority is decided by the `@layer fui.*` order in Label.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(
    styles.root,
    labelClassNames.root,
    weight === 'semibold' && styles.semibold,
    state.root.className,
  );

  if (state.required) {
    const required = state.required as NonNullable<LabelState['required']> & LabelRequiredDataAttributes;

    required['data-disabled'] = disabled || undefined;

    // Sub-slot: the static is gone, the hashed module class leads. No marker rides a
    // sub-slot, so D15.1 is not in play here (statics-removal design §4c).
    state.required.className = clsx(styles.required, state.required.className);
  }

  return state;
};

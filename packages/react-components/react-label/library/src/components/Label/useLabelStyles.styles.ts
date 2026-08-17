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
 * Data attributes rendered on the Label slots and matched by the shared `@custom-variant` catalog
 * in `@fluentui/react-tailwind-theme` (`css/variants.css`).
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

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
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

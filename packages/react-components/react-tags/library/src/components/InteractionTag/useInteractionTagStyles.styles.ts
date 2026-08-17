import { clsx } from 'clsx';
import type { InteractionTagState } from './InteractionTag.types';

import styles from './InteractionTag.module.css';

/**
 * Public identity class for InteractionTag.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The per-slot keys were removed together with the BEM
 * statics (D16.1): there is no public class-name handle on component internals any more.
 *
 * `'.' + interactionTagClassNames.root` is an INVALID selector — `/` is legal in a class
 * TOKEN but terminates the name in selector position. Use
 * `fuiSelector(interactionTagClassNames.root)` from `@fluentui/react-utilities`.
 */
export const interactionTagClassNames: { root: string } = {
  root: 'group/fui-interaction-tag',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `size` is a small ENUM scale, so it takes the catalog's `size-*` variants
 * (DECISIONS.md D3). `shape` stays a conditional CLASS in the composition below, the
 * same way `rootStyles[shape]` was a conditional mergeClasses argument.
 */
type InteractionTagRootDataAttributes = {
  'data-size': InteractionTagState['size'];
};

/**
 * Apply styling to the InteractionTag slots based on the state
 */
export const useInteractionTagStyles_unstable = (state: InteractionTagState): InteractionTagState => {
  const { shape, size } = state;

  const root = state.root as InteractionTagState['root'] & InteractionTagRootDataAttributes;

  root['data-size'] = size;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, interactionTagClassNames.root, styles[shape], state.root.className);

  return state;
};

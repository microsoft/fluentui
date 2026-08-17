import { clsx } from 'clsx';
import type { DividerState } from './Divider.types';

import styles from './Divider.module.css';

/**
 * Public identity class for Divider.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. The `wrapper` key was removed along with the BEM statics
 * (DECISIONS.md D16.1 / D16.5): there is no public class-name handle on component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + dividerClassNames.root` is an invalid selector. Use `fuiSelector(dividerClassNames.root)`
 * from `@fluentui/react-utilities` at every selector site (DECISIONS.md D16.5).
 */
export const dividerClassNames: { root: string } = {
  root: 'group/fui-divider',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `data-inset` / `data-empty` are *presence* selectors, so the flags are written as
 * `flag || undefined` — React omits an attribute whose value is `undefined`, whereas
 * `false` would render `data-inset="false"` and still match `[data-inset]`.
 */
type DividerRootDataAttributes = {
  'data-orientation': 'horizontal' | 'vertical';
  'data-align-content': DividerState['alignContent'];
  'data-inset'?: true;
  'data-empty'?: true;
};

export const useDividerStyles_unstable = (state: DividerState): DividerState => {
  const { alignContent, appearance, inset, vertical } = state;
  const isEmpty = state.root.children === undefined;

  const root = state.root as DividerState['root'] & DividerRootDataAttributes;

  root['data-orientation'] = vertical ? 'vertical' : 'horizontal';
  root['data-align-content'] = alignContent;
  root['data-inset'] = inset || undefined;
  root['data-empty'] = isEmpty || undefined;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    dividerClassNames.root,
    appearance && styles[appearance],
    state.root.className,
  );

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.

  return state;
};

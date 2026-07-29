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

  // Unconditional module class FIRST, then the named group marker, then the conditional
  // module classes, with the consumer className last (DECISIONS.md D16.2). The marker must
  // never be `classList[0]` — nwsapi's `:scope` polyfill throws on it under jsdom
  // (DECISIONS.md D15.1) — and `styles.root` is the token that guarantees it, since clsx
  // never drops an unconditional argument. The BEM static that used to hold that position
  // is gone (DECISIONS.md D16.1).
  //
  // The marker is a literal, unhashed, GLOBAL token and now the component's SOLE public
  // identity class: it is the only handle by which another module — in this package or any
  // other — can style an element from this Divider's state, because `styles.root` is hashed
  // and unaddressable from outside this file. Divider needs no state mirrors:
  // `data-orientation`, `data-align-content`, `data-inset` and `data-empty` are already
  // stamped on this very element above, so `@variant group-vertical/fui-divider`,
  // `group-inset/fui-divider` etc. work as-is (DECISIONS.md D15, Tier 0).
  //
  // Cascade priority is decided by the `@layer fui.*` order in Divider.module.css,
  // not by the order of these arguments — see that file's header for the mapping back
  // to the mergeClasses() argument order this replaces.
  state.root.className = clsx(styles.root, 'group/fui-divider', appearance && styles[appearance], state.root.className);

  // The `wrapper` slot carries NO class of its own. Its only library token was the
  // `fui-Divider__wrapper` static, and Divider.module.css declares no `.wrapper` local —
  // the wrapper is positioned entirely by the root's grid. With the static removed the
  // assignment would be `clsx(state.wrapper.className)`, an identity on the consumer's own
  // string, so it is deleted outright rather than left as dead code implying this hook
  // styles a slot it does not (statics-removal design §4d / DECISIONS.md D16.1).

  return state;
};

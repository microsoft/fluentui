import { clsx } from 'clsx';
import type { ToolbarState } from './Toolbar.types';

import styles from './Toolbar.module.css';

/**
 * Public identity classes for Toolbar.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The BEM statics (`fui-Toolbar`) were removed in D16.1;
 * there is no public class-name handle on component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + toolbarClassNames.root` is a `SyntaxError`. Use `fuiSelector(toolbarClassNames.root)`
 * from `@fluentui/react-utilities` at every selector site (D16.5).
 */
export const toolbarClassNames: { root: string } = {
  root: 'group/fui-toolbar',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`). Both names come from
 * the headless preview's vocabulary (reports/headless-precedent.md).
 *
 * Both are stamped UNCONDITIONALLY. `data-size` in particular is written even on a
 * vertical toolbar, where the Griffel hook applied no size slice: the `!vertical` half of
 * that gate is expressed in CSS by nesting the size variants inside `@variant horizontal`
 * (see Toolbar.module.css), not by withholding the attribute. Toolbar also publishes
 * `size` to its children through ToolbarContext, so an absent `data-size` would make the
 * DOM disagree with the state the children are reading.
 */
type ToolbarRootDataAttributes = {
  'data-orientation': 'horizontal' | 'vertical';
  'data-size': ToolbarState['size'];
};

/**
 * Apply styling to the Toolbar slots based on the state
 */
export const useToolbarStyles_unstable = (state: ToolbarState): ToolbarState => {
  const { vertical, size } = state;

  const root = state.root as ToolbarState['root'] & ToolbarRootDataAttributes;

  root['data-orientation'] = vertical ? 'vertical' : 'horizontal';
  root['data-size'] = size;

  // Module class FIRST, then the named group marker, consumer className last (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so it is always the leading token and the marker
  // is never `classList[0]` — nwsapi's `:scope` polyfill throws on the `/` under jsdom
  // (D15.1). Before the statics sweep the `fui-Toolbar` class held that position
  // incidentally; now it is held explicitly by the hashed CSS-Modules class. The marker is a
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this Toolbar's state, because `styles.root` is
  // hashed and unaddressable from outside this file. Toolbar is the outermost of four
  // nested components (Toolbar > ToolbarGroup > ToolbarButton / ToolbarDivider), each of
  // which now carries its own marker, so a descendant can read whichever ancestor it
  // actually cares about — e.g. `@variant group-orientation-vertical/fui-toolbar { … }`
  // (DECISIONS.md D15, Tier 0 — `data-orientation` and `data-size` are already on this
  // element).
  //
  // Cascade priority is decided by the `@layer fui.*` order in Toolbar.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(styles.root, 'group/fui-toolbar', state.root.className);

  return state;
};

import { clsx } from 'clsx';

import type { ToolbarGroupState } from './ToolbarGroup.types';

import styles from './ToolbarGroup.module.css';

/**
 * Public identity classes for ToolbarGroup.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The BEM statics (`fui-ToolbarGroup`) were removed in
 * D16.1; there is no public class-name handle on component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + toolbarGroupClassNames.root` is a `SyntaxError`. Use
 * `fuiSelector(toolbarGroupClassNames.root)` from `@fluentui/react-utilities` at every
 * selector site (D16.5).
 */
export const toolbarGroupClassNames: { root: string } = {
  root: 'group/fui-toolbar-group',
};

/**
 * Data attribute rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `vertical` is optional on ToolbarGroupState — it is injected from ToolbarContext, so it
 * is `undefined` when a ToolbarGroup is rendered outside a Toolbar. `undefined` was falsy
 * for the Griffel `vertical && …` gate and maps to `"horizontal"` here: same branch.
 */
type ToolbarGroupRootDataAttributes = {
  'data-orientation': 'horizontal' | 'vertical';
};

/**
 * Apply styling to the Toolbar slots based on the state
 */
export const useToolbarGroupStyles_unstable = (state: ToolbarGroupState): ToolbarGroupState => {
  const { vertical } = state;

  const root = state.root as ToolbarGroupState['root'] & ToolbarGroupRootDataAttributes;

  root['data-orientation'] = vertical ? 'vertical' : 'horizontal';

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, toolbarGroupClassNames.root, state.root.className);

  return state;
};

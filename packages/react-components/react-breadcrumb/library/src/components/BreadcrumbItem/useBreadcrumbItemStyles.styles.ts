import { clsx } from 'clsx';
import type { BreadcrumbItemState } from './BreadcrumbItem.types';

import styles from './BreadcrumbItem.module.css';

/**
 * Public identity class for BreadcrumbItem.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. There is no public class-name handle on component
 * internals any more (DECISIONS.md D16.1).
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + breadcrumbItemClassNames.root` is a `SyntaxError`. Build selectors with
 * `fuiSelector(breadcrumbItemClassNames.root)` from `@fluentui/react-utilities` (D16.5);
 * token-taking DOM APIs (`classList.contains`, `getElementsByClassName`) need no escaping.
 */
export const breadcrumbItemClassNames: { root: string } = {
  root: 'group/fui-breadcrumb-item',
};

/**
 * Apply styling to the BreadcrumbItem slots based on the state
 */
export const useBreadcrumbItemStyles_unstable = (state: BreadcrumbItemState): BreadcrumbItemState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, breadcrumbItemClassNames.root, state.root.className);

  return state;
};

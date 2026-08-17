import { clsx } from 'clsx';
import type { BreadcrumbState } from './Breadcrumb.types';

import styles from './Breadcrumb.module.css';

/**
 * Public identity class for Breadcrumb.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The per-slot `list` key was removed: there is no public
 * class-name handle on component internals any more (DECISIONS.md D16.1).
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + breadcrumbClassNames.root` is a `SyntaxError`. Build selectors with
 * `fuiSelector(breadcrumbClassNames.root)` from `@fluentui/react-utilities` (D16.5);
 * token-taking DOM APIs (`classList.contains`, `getElementsByClassName`) need no escaping.
 */
export const breadcrumbClassNames: { root: string } = {
  root: 'group/fui-breadcrumb',
};

/**
 * Apply styling to the Breadcrumb slots based on the state
 */
export const useBreadcrumbStyles_unstable = (state: BreadcrumbState): BreadcrumbState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, breadcrumbClassNames.root, state.root.className);

  if (state.list) {
    // `list` carries no marker and no static any more — just its own hashed module class,
    // which becomes `classList[0]`. D15.1 is not in play on a marker-free slot.
    state.list.className = clsx(styles.list, state.list.className);
  }

  return state;
};

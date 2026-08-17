import { clsx } from 'clsx';
import type { MenuPopoverState } from './MenuPopover.types';

import styles from './MenuPopover.module.css';

/**
 * Public identity class for MenuPopover.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target.
 *
 * `'.' + menuPopoverClassNames.root` is an invalid *selector* — the `/` terminates the class
 * name. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const menuPopoverClassNames: { root: string } = {
  root: 'group/fui-menu-popover',
};

/**
 * Apply styling to the Menu slots based on the state
 */
export const useMenuPopoverStyles_unstable = (state: MenuPopoverState): MenuPopoverState => {
  // Unconditional module class FIRST, then the named group marker, consumer className last
  // (DECISIONS.md D16.2). The marker must never be `classList[0]` — nwsapi's `:scope`
  // polyfill throws on it under jsdom (DECISIONS.md D15.1). The BEM static that used to hold
  // that position is gone (DECISIONS.md D16.1).
  //
  // This slot is PORTALLED and positioned by @fluentui/react-positioning; its classes still
  // arrive through this hook exactly like any other slot, and the package's compiled
  // `dist/styles.css` is document-level so it reaches the portal wherever it mounts.
  state.root.className = clsx(styles.root, menuPopoverClassNames.root, state.root.className);
  return state;
};

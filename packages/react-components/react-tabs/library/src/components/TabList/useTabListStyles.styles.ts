import { clsx } from 'clsx';
import type { TabListState } from './TabList.types';

import styles from './TabList.module.css';

/**
 * Public identity class for TabList.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target. TabList declares no other slot, so nothing was removed from this
 * object; its type simply narrows from `SlotClassNames<TabListSlots>` to `{ root: string }`
 * alongside every other converted package (DECISIONS.md D16.5).
 *
 * The value is a class TOKEN, not a selector — `'.' + tabListClassNames.root` is invalid CSS,
 * because the `/` must be escaped in a selector. Use `fuiSelector(tabListClassNames.root)`
 * from `@fluentui/react-utilities` (DECISIONS.md D16.5).
 */
export const tabListClassNames: { root: string } = {
  root: 'group/fui-tab-list',
};

/**
 * Apply styling to the TabList slots based on the state
 */
export const useTabListStyles_unstable = (state: TabListState): TabListState => {
  const { appearance, vertical, size } = state;

  const isRounded = appearance === 'subtle-circular' || appearance === 'filled-circular';

  // `styles.root` first — hashed, unconditional and selector-safe — then the named group
  // marker, which must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1/D16.2) — with the consumer className last. The `fui-TabList`
  // BEM static that used to lead this list is gone (D16.1); the marker is TabList's sole
  // public identity CLASS now.
  //
  // Cascade priority is decided by the `@layer fui.*` order in TabList.module.css and by
  // block order within it, not by the order of these arguments — see that file's header for
  // the mapping back to the mergeClasses() argument order this replaces.
  //
  // The state mutation is preserved deliberately (DECISIONS.md D14 defers the pure-builder
  // rewrite to a single Phase 3 sweep). The Griffel original's
  // `eslint-disable-next-line react-hooks/immutability` comment is dropped because the rule
  // no longer reports here — same as the react-slider and react-divider conversions.
  state.root.className = clsx(
    styles.root,
    tabListClassNames.root,
    vertical ? styles.vertical : styles.horizontal,
    isRounded && (size === 'small' ? styles['rounded-small'] : styles.rounded),
    state.root.className,
  );

  return state;
};

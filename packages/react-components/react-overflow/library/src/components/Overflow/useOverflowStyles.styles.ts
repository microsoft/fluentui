import { clsx } from 'clsx';
import { getTriggerChild } from '@fluentui/react-utilities';
import type { OverflowComponentState } from './Overflow.types';

import styles from './Overflow.module.css';

/**
 * Public identity class for Overflow.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. It replaces the `fui-Overflow` static class this hook used to
 * render, which was removed with every other BEM static (DECISIONS.md D16.1).
 *
 * Overflow renders no element of its own: the class lands on the single child the consumer
 * passes, cloned by `renderOverflow_unstable`.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + overflowClassNames.root` is an invalid selector. Use
 * `fuiSelector(overflowClassNames.root)` from `@fluentui/react-utilities` at every selector
 * site (DECISIONS.md D16.5).
 */
export const overflowClassNames: { root: string } = {
  root: 'group/fui-overflow',
};

export const useOverflowStyles_unstable = (state: OverflowComponentState): OverflowComponentState => {
  const child = getTriggerChild<HTMLElement>(state.children);

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.className = clsx(styles.root, overflowClassNames.root, child?.props.className);

  return state;
};

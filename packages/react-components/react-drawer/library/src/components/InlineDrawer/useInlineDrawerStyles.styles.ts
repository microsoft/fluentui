import { clsx } from 'clsx';

import type { InlineDrawerState } from './InlineDrawer.types';
import { setDrawerBaseDataAttributes } from '../../shared/useDrawerBaseStyles.styles';

import styles from './InlineDrawer.module.css';

/**
 * InlineDrawer's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const inlineDrawerClassNames: { root: string } = {
  root: 'group/fui-inline-drawer',
};

/**
 * Apply styling to the InlineDrawer slots based on the state
 */
export const useInlineDrawerStyles_unstable = (state: InlineDrawerState): InlineDrawerState => {
  // `position` and `size` drive `:where([data-position=…])` / `@variant size-…` rules in
  // InlineDrawer.module.css. They replace the `useDrawerBaseClassNames` lookup AND the two
  // `switch (state.position)` helpers this file used to carry (`getSeparatorClass` /
  // `getAnimationExitClass`): the position branch is now expressed once, in CSS, so
  // `separator` and `animationDirection` reduce to two flat conditional classes.
  setDrawerBaseDataAttributes(state);

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    inlineDrawerClassNames.root,
    state.separator && styles.separator,
    state.animationDirection === 'exit' && styles['animation-exit'],
    state.root.className,
  );

  return state;
};

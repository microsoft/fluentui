'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useDividerStyles_unstable`, so
 * `enforce-use-client` sees a hook call and never reports the directive as unnecessary. The
 * converted leaf hooks (Toolbar, ToolbarGroup) call nothing and carry no directive at all —
 * see useToolbarStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useDividerStyles_unstable } from '@fluentui/react-divider';
import type { ToolbarDividerState } from './ToolbarDivider.types';

import styles from './ToolbarDivider.module.css';

/**
 * Data attribute rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `useDividerStyles_unstable` — called on the line above the assignment — already writes
 * the identical value from the same `state.vertical`. Re-stamping is idempotent and keeps
 * ToolbarDivider.module.css's selectors from silently depending on another package's
 * stamping.
 */
type ToolbarDividerRootDataAttributes = {
  'data-orientation': 'horizontal' | 'vertical';
};

/**
 * Apply styling to the ToolbarDivider slots based on the state
 */
export const useToolbarDividerStyles_unstable = (state: ToolbarDividerState): ToolbarDividerState => {
  state = useDividerStyles_unstable(state);

  const { vertical } = state;

  const rootDataAttributes: ToolbarDividerRootDataAttributes = {
    'data-orientation': vertical ? 'vertical' : 'horizontal',
  };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: {
      ...state.root,
      ...rootDataAttributes,
      className: clsx(styles.root, 'group/fui-toolbar-divider', state.root.className),
    },
  };

  return state;
};

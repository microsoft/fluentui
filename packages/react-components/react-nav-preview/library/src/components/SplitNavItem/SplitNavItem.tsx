import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useSplitNavItem_unstable } from './useSplitNavItem';
import { renderSplitNavItem_unstable } from './renderSplitNavItem';
import { useSplitNavItemStyles_unstable } from './useSplitNavItemStyles.styles';
import type { SplitNavItemProps } from './SplitNavItem.types';

/**
 * SplitNavItem component - TODO: add more docs
 */
export const SplitNavItem: ForwardRefComponent<SplitNavItemProps> = React.forwardRef((props, ref) => {
  const state = useSplitNavItem_unstable(props, ref);

  useSplitNavItemStyles_unstable(state);

  /**
   * @see https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/custom-styling.md
   *
   * TODO: 💡 once package will become stable (PR which will be part of promoting PREVIEW package to STABLE),
   *      - uncomment this line
   *      - update types {@link file://./../../../../../../../packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts#CustomStyleHooksContextValue}
   *      - verify that custom global style override works for your component
   */
  // useCustomStyleHook_unstable('useSplitNavItemStyles_unstable')(state);

  return renderSplitNavItem_unstable(state);
});

SplitNavItem.displayName = 'SplitNavItem';

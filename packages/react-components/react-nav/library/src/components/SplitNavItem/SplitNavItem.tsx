import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

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
  useCustomStyleHook_unstable('useSplitNavItemStyles_unstable')(state);

  return renderSplitNavItem_unstable(state);
});

SplitNavItem.displayName = 'SplitNavItem';

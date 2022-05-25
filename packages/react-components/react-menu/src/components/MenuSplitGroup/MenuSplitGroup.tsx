import * as React from 'react';
import { useMenuSplitGroup_unstable } from './useMenuSplitGroup';
import { renderMenuSplitGroup_unstable } from './renderMenuSplitGroup';
import { useMenuSplitGroupStyles_unstable } from './useMenuSplitGroupStyles';
import type { MenuSplitGroupProps } from './MenuSplitGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Layout wrapper that provides extra keyboard navigation behavior for two `MenuItem` components.
 */
export const MenuSplitGroup: ForwardRefComponent<MenuSplitGroupProps> = React.forwardRef((props, ref) => {
  const state = useMenuSplitGroup_unstable(props, ref);

  useMenuSplitGroupStyles_unstable(state);
  return renderMenuSplitGroup_unstable(state);
});

MenuSplitGroup.displayName = 'MenuSplitGroup';

import * as React from 'react';
import { useMenuSplitGroup } from './useMenuSplitGroup';
import { renderMenuSplitGroup } from './renderMenuSplitGroup';
import { useMenuSplitGroupStyles } from './useMenuSplitGroupStyles';
import type { MenuSplitGroupProps } from './MenuSplitGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Layout wrapper that provides extra keyboard navigation behavior for two `MenuItem` components.
 */
export const MenuSplitGroup: ForwardRefComponent<MenuSplitGroupProps> = React.forwardRef((props, ref) => {
  const state = useMenuSplitGroup(props, ref);

  useMenuSplitGroupStyles(state);
  return renderMenuSplitGroup(state);
});

MenuSplitGroup.displayName = 'MenuSplitGroup';

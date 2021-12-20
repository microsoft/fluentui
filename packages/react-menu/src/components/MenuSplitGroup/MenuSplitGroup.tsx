import * as React from 'react';
import { unstable_useMenuSplitGroup } from './useMenuSplitGroup';
import { unstable_renderMenuSplitGroup } from './renderMenuSplitGroup';
import { unstable_useMenuSplitGroupStyles } from './useMenuSplitGroupStyles';
import type { MenuSplitGroupProps } from './MenuSplitGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * MenuSplitGroup component
 */
export const MenuSplitGroup_unstable: ForwardRefComponent<MenuSplitGroupProps> = React.forwardRef((props, ref) => {
  const state = unstable_useMenuSplitGroup(props, ref);

  unstable_useMenuSplitGroupStyles(state);
  return unstable_renderMenuSplitGroup(state);
});

MenuSplitGroup_unstable.displayName = 'MenuSplitGroup';

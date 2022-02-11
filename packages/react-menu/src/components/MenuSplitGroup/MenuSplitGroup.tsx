import * as React from 'react';
import { useMenuSplitGroup_unstable } from './useMenuSplitGroup';
import type { MenuSplitGroupProps } from './MenuSplitGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Layout wrapper that provides extra keyboard navigation behavior for two `MenuItem` components.
 */
export const MenuSplitGroup: ForwardRefComponent<MenuSplitGroupProps> = React.forwardRef((props, ref) => {
  const [state, render] = useMenuSplitGroup_unstable(props, ref);
  return render(state);
});

MenuSplitGroup.displayName = 'MenuSplitGroup';

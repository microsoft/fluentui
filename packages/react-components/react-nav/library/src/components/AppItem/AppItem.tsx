import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

import { useAppItem_unstable } from './useAppItem';
import { renderAppItem_unstable } from './renderAppItem';
import { useAppItemStyles_unstable } from './useAppItemStyles.styles';
import type { AppItemProps } from './AppItem.types';

/**
 * AppItem component - Application item in the navigation menu.
 */
export const AppItem: ForwardRefComponent<AppItemProps> = React.forwardRef((props, ref) => {
  const state = useAppItem_unstable(props, ref);

  useAppItemStyles_unstable(state);
  useCustomStyleHook_unstable('useAppItemStyles_unstable')(state);

  return renderAppItem_unstable(state);
});

AppItem.displayName = 'AppItem';

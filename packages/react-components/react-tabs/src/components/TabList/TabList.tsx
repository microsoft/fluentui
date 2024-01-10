import * as React from 'react';
import { useTabList_unstable } from './useTabList';
import { renderTabList_unstable } from './renderTabList';
import { useTabListStyles_unstable } from './useTabListStyles.styles';
import type { TabListProps } from './TabList.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTabListContextValues_unstable } from './useTabListContextValues';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * A tab list provides single selection from a set of tabs.
 */
export const TabList: ForwardRefComponent<TabListProps> = React.forwardRef((props, ref) => {
  const state = useTabList_unstable(props, ref);
  const contextValues = useTabListContextValues_unstable(state);

  useTabListStyles_unstable(state);

  useCustomStyleHook_unstable('useTabListStyles_unstable')(state);

  return renderTabList_unstable(state, contextValues);
});

TabList.displayName = 'TabList';

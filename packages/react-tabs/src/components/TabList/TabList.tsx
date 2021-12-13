import * as React from 'react';
import { useTabList } from './useTabList';
import { renderTabList } from './renderTabList';
import { useTabListStyles } from './useTabListStyles';
import type { TabListProps } from './TabList.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTabListContextValues } from './useTabListContextValues';

/**
 * A tab list provides single selection from a set of tabs.
 */
export const TabList: ForwardRefComponent<TabListProps> = React.forwardRef((props, ref) => {
  const state = useTabList(props, ref);
  const contextValues = useTabListContextValues(state);

  useTabListStyles(state);
  return renderTabList(state, contextValues);
});

TabList.displayName = 'TabList';

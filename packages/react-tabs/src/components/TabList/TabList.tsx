import * as React from 'react';
import { useTabList } from './useTabList';
import { renderTabList } from './renderTabList';
import { useTabListStyles } from './useTabListStyles';
import type { TabListProps } from './TabList.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * TabList component
 */
export const TabList: ForwardRefComponent<TabListProps> = React.forwardRef((props, ref) => {
  const state = useTabList(props, ref);

  useTabListStyles(state);
  return renderTabList(state);
});

TabList.displayName = 'TabList';

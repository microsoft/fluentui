import * as React from 'react';
import { useTabList_unstable } from './useTabList';
import type { TabListProps } from './TabList.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A tab list provides single selection from a set of tabs.
 */
export const TabList: ForwardRefComponent<TabListProps> = React.forwardRef((props, ref) => {
  const [state, render, context] = useTabList_unstable(props, ref);
  return render(state, context);
});

TabList.displayName = 'TabList';

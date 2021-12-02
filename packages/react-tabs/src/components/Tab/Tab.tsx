import * as React from 'react';
import { useTab } from './useTab';
import { renderTab } from './renderTab';
import { useTabStyles } from './useTabStyles';
import type { TabProps } from './Tab.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A tab provides a selectable header in a tab list.
 */
export const WiseTab: ForwardRefComponent<TabProps> = React.forwardRef((props, ref) => {
  const state = useTab(props, ref);

  //useTabStyles(state);
  useWiseTabStyles(state);
  return renderTab(state);
});

Tab.displayName = 'Tab';

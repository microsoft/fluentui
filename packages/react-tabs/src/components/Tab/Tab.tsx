import * as React from 'react';
import { useTab_unstable } from './useTab';
import { renderTab_unstable } from './renderTab';
import { useTabStyles_unstable } from './useTabStyles';
import type { TabProps } from './Tab.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A tab provides a selectable item in a tab list.
 */
export const Tab: ForwardRefComponent<TabProps> = React.forwardRef((props, ref) => {
  const state = useTab_unstable(props, ref);

  useTabStyles_unstable(state);
  return renderTab_unstable(state);
});

Tab.displayName = 'Tab';

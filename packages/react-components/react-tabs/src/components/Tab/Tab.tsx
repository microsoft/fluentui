import * as React from 'react';
import { useTab_unstable } from './useTab';
import { renderTab_unstable } from './renderTab';
import { useTabStyles_unstable } from './useTabStyles';
import type { TabProps } from './Tab.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * A tab provides a selectable item in a tab list.
 */
export const Tab: ForwardRefComponent<TabProps> = React.forwardRef((props, ref) => {
  const state = useTab_unstable(props, ref);

  useTabStyles_unstable(state);

  const { useTabStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderTab_unstable(state);
});

Tab.displayName = 'Tab';

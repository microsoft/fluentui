import * as React from 'react';
import { useTab_unstable } from './useTab';
import type { TabProps } from './Tab.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A tab provides a selectable item in a tab list.
 */
export const Tab: ForwardRefComponent<TabProps> = React.forwardRef((props, ref) => {
  const [state, render] = useTab_unstable(props, ref);
  return render(state);
});

Tab.displayName = 'Tab';

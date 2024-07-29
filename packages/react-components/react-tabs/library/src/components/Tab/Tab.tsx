import * as React from 'react';
import { useTab_unstable } from './useTab';
import { renderTab_unstable } from './renderTab';
import { useTabStyles_unstable } from './useTabStyles.styles';
import type { TabProps } from './Tab.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * A tab provides a selectable item in a tab list.
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const Tab: ForwardRefComponent<TabProps> = React.forwardRef((props, ref) => {
  const state = useTab_unstable(props, ref);

  useTabStyles_unstable(state);

  useCustomStyleHook_unstable('useTabStyles_unstable')(state);

  return renderTab_unstable(state);
});

Tab.displayName = 'Tab';

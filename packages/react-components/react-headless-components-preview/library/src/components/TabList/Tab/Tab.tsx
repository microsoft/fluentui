'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TabProps } from './Tab.types';
import { useTab } from './useTab';
import { renderTab } from './renderTab';

/**
 * A tab  component for organizing content.
 */
export const Tab: ForwardRefComponent<TabProps> = React.forwardRef((props, ref) => {
  const state = useTab(props, ref);

  return renderTab(state);
});

Tab.displayName = 'Tab';

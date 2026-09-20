'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TabProps } from './Tab.types';
import { renderTab } from './renderTab';
import { useTab } from './useTab';
import { useTabStyles } from './useTabStyles.styles';

export const Tab: ForwardRefComponent<TabProps> = React.forwardRef((props, ref) => {
  const state = useTab(props, ref);

  useTabStyles(state);

  return renderTab(state);
});

Tab.displayName = 'Tab';

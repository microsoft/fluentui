'use client';

import * as React from 'react';
import type { TabListVisualContextValue } from './TabList.types';

const defaultContextValue: TabListVisualContextValue = {
  appearance: 'transparent',
  getRegisteredTabs: () => ({ registeredTabs: {} }),
  reserveSelectedTabSpace: true,
  size: 'medium',
};

export const TabListVisualContext = React.createContext<TabListVisualContextValue | undefined>(undefined);

export const useTabListVisualContext = (): TabListVisualContextValue =>
  React.useContext(TabListVisualContext) ?? defaultContextValue;

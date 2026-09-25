'use client';

import * as React from 'react';

export type ComponentPageHeaderContextValue = {
  title: React.ReactNode;
  description?: string;
};

const ComponentPageHeaderContext = React.createContext<ComponentPageHeaderContextValue | undefined>(undefined);

export const ComponentPageHeaderProvider = ComponentPageHeaderContext.Provider;

export function useComponentPageHeader(): ComponentPageHeaderContextValue | undefined {
  return React.useContext(ComponentPageHeaderContext);
}

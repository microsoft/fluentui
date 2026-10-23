'use client';

import * as React from 'react';
import type { ListNavigationMode } from './List.types';

const ListNavigationContext = React.createContext<ListNavigationMode | undefined>(undefined);

export const ListNavigationProvider = ListNavigationContext.Provider;
export const useListNavigationMode = (): ListNavigationMode | undefined => React.useContext(ListNavigationContext);

'use client';

import * as React from 'react';

export const TreeDisabledContext = React.createContext<boolean | undefined>(undefined);
export const SubtreeDisabledContext = React.createContext<boolean | undefined>(undefined);
export const TreeItemDisabledContext = React.createContext<boolean | undefined>(undefined);

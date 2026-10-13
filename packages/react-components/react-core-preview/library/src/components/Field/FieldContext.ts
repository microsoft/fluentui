'use client';

import * as React from 'react';

import type { FieldContextValue } from './Field.types';

const FieldContext = React.createContext<FieldContextValue | undefined>(undefined);

export const FieldContextProvider = FieldContext.Provider;

export const useFieldContext = (): FieldContextValue | undefined => React.useContext(FieldContext);

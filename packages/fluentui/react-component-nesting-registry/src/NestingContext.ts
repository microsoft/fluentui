import * as React from 'react';
import { NestingContextValue } from './types';

export const NestingContext = React.createContext<NestingContextValue | null>(null);

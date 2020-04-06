import * as React from 'react';
import { NestingContextValue } from './types';

const NestingContext = React.createContext<NestingContextValue | null>(null);

export default NestingContext;

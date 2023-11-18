import * as React from 'react';

import type { FieldContextValue } from '../Field';

const FieldContext = React.createContext<FieldContextValue | undefined>(undefined);

export const FieldContextProvider = FieldContext.Provider;

export const useFieldContext_unstable = () => React.useContext(FieldContext);

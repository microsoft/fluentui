import * as React from 'react';

export const MotionDisableContext = React.createContext<boolean | undefined>(undefined);
export const MotionDisableProvider = MotionDisableContext.Provider;
export const useMotionDisableContext = () => React.useContext(MotionDisableContext) ?? false;

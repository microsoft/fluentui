import * as React from 'react';

export type InlineLinkContextValue = {
  inlineLinks: boolean;
};

const inlineLinkContext = React.createContext<InlineLinkContextValue | undefined>(undefined);

export const inlineLinkContextDefaultValue: InlineLinkContextValue = {
  inlineLinks: false,
};

export const InlineLinkContextProvider = inlineLinkContext.Provider;
export const useInlineLinkContext = () => React.useContext(inlineLinkContext) ?? inlineLinkContextDefaultValue;

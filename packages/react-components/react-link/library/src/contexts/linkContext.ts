import * as React from 'react';

export type LinkContextValue = {
  inline?: boolean;
};

const LinkContext = React.createContext<LinkContextValue | undefined>(undefined);

export const linkContextDefaultValue: LinkContextValue = {
  inline: false,
};

export const LinkContextProvider = LinkContext.Provider;
export const useLinkContext = (): LinkContextValue => React.useContext(LinkContext) ?? linkContextDefaultValue;

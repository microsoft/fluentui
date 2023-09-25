import * as React from 'react';

export type PortalContextValue = {
  className: string;
};

export const PortalContext = React.createContext<PortalContextValue>({
  className: '',
});

import * as React from 'react';

export const PortalContext = React.createContext<HTMLDivElement | undefined>(undefined);

export const usePortalContext = () => React.useContext(PortalContext);

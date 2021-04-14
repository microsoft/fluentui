import * as React from 'react';
import { TooltipContext } from './TooltipContext.types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const internal__TooltipContext = React.createContext<TooltipContext>({
  // These default values are replaced by TooltipProvider
  Tooltip: () => null, // eslint-disable-line @typescript-eslint/naming-convention
  manager: undefined,
  portalRoot: document.body,
});

export const useTooltipContext = () => React.useContext(internal__TooltipContext);

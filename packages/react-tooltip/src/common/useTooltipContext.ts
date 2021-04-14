import * as React from 'react';
import { TooltipContext } from './types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const internal__TooltipContext = React.createContext<TooltipContext>({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Tooltip: () => null,
  manager: undefined,
  portalRoot: document.body,
});

export const useTooltipContext = () => React.useContext(internal__TooltipContext);

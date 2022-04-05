import * as React from 'react';
import type { ToolbarContextValue } from './Toolbar.types';

export const ToolbarContext = React.createContext<ToolbarContextValue>({
  size: 'medium',
});

export const useToolbarContext = () => React.useContext(ToolbarContext);

import * as React from 'react';
import type { ToolbarContextValue } from './Toolbar.types';

// eslint-disable-next-line @fluentui/no-context-default-value
export const ToolbarContext = React.createContext<ToolbarContextValue>({
  size: 'medium',
});

export const useToolbarContext = () => React.useContext(ToolbarContext);

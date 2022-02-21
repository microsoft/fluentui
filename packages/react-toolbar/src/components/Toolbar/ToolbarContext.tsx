import * as React from 'react';
import { createContext } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import type { ToolbarContextValue } from './Toolbar.types';

export const ToolbarContext = React.createContext<ToolbarContextValue>({
  size: 'medium',
});

export const useToolbarContext = () => React.useContext(ToolbarContext);

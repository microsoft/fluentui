import * as React from 'react';
import type { ToolbarContextValue } from './Toolbar.types';

export const ToolbarContext = React.createContext<ToolbarContextValue | undefined>(undefined);

const toolbarContextDefaultValue = {
  size: 'medium' as 'medium',
};

export const useToolbarContext = () => React.useContext(ToolbarContext) ?? toolbarContextDefaultValue;
